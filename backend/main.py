import os
import json
import re
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

# Verify and configure API key
api_key = os.getenv("GROQ_API_KEY")
print(f"Loaded GROQ_API_KEY: {'[SET - Ends in ' + api_key[-4:] + ']' if api_key and len(api_key) > 4 else '[NOT VALID/MISSING]'}")

client = Groq(api_key=api_key)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    input_text: str

class AnalyzeResponse(BaseModel):
    recommendation: str
    confidence: float
    reason: str

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_text(request: AnalyzeRequest):
    input_text = request.input_text.strip()
    if not input_text:
        return AnalyzeResponse(
            recommendation="HOLD",
            confidence=0.0,
            reason="Input text cannot be empty."
        )
        
    prompt = f"""Analyze the following financial text and return ONLY valid JSON.

Text: {input_text}

Return format:
{{
"recommendation": "BUY or SELL or HOLD",
"confidence": number between 0 and 1,
"reason": "short explanation"
}}"""
        
    try:
        print(f"\n--- AI Request Triggered ---")
        completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.1,
            response_format={"type": "json_object"}
        )
        
        response_content = completion.choices[0].message.content
        print(f"Raw AI Response:\n{response_content}\n")
        
        if not response_content:
            raise ValueError("Empty response from AI")
            
        # Extract JSON from response text safely
        try:
            result = json.loads(response_content)
        except json.JSONDecodeError:
            # Fallback extraction if not pure JSON
            json_match = re.search(r'\{(?:[^{}]|(?(?=\{).*?\}))*\}', response_content, re.DOTALL)
            if json_match:
                result = json.loads(json_match.group(0))
            else:
                raise Exception("Failed to parse JSON")

        print(f"Parsed JSON:\n{result}\n--------------------------")
            
        rec = result.get("recommendation", "HOLD").upper()
        if rec not in ["BUY", "SELL", "HOLD"]:
            rec = "HOLD"
            
        try:
            conf = float(result.get("confidence", 0.5))
        except (ValueError, TypeError):
            conf = 0.5
            
        reason = result.get("reason", "No reasoning provided by AI.")
        
        return AnalyzeResponse(
            recommendation=rec,
            confidence=conf,
            reason=reason
        )
        
    except Exception as e:
        print(f"AI Analysis Error: {e}")
        # Always return structured fallback if something fails
        return AnalyzeResponse(
            recommendation="HOLD",
            confidence=0.5,
            reason=f"Unable to analyze confidently due to error: {str(e)[:50]}..."
        )

@app.get("/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
