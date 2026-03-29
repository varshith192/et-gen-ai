import os
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows localhost:5173
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
    if not request.input_text.strip():
        raise HTTPException(status_code=400, detail="Input text cannot be empty")
        
    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an expert financial analysis multi-agent swarm. Your task is to process stock news or PR data. "
                        "Read the input carefully, perform sentiment analysis, map it to a decision, and state your reasoning clearly. "
                        "You MUST return the output as a strictly formatted JSON object with exactly these three keys: "
                        "\n1. 'recommendation': MUST be exactly one of 'BUY', 'SELL', or 'HOLD'."
                        "\n2. 'confidence': A numerical float between 0.0 and 1.0 indicating your certainty."
                        "\n3. 'reason': A short, clear 1-3 sentence explanation detailing your reasoning."
                    )
                },
                {
                    "role": "user",
                    "content": request.input_text
                }
            ],
            temperature=0.2, # Low temp for consistency
            response_format={"type": "json_object"}
        )
        
        response_content = completion.choices[0].message.content
        if not response_content:
            raise ValueError("Empty response from AI")
            
        result = json.loads(response_content)
        
        rec = result.get("recommendation", "HOLD").upper()
        if rec not in ["BUY", "SELL", "HOLD"]:
            rec = "HOLD"
            
        conf = float(result.get("confidence", 0.5))
        reason = result.get("reason", "No reason provided by AI.")
        
        return AnalyzeResponse(
            recommendation=rec,
            confidence=conf,
            reason=reason
        )
        
    except Exception as e:
        print(f"AI Analysis Error: {e}")
        # Fallback response
        return AnalyzeResponse(
            recommendation="HOLD",
            confidence=0.5,
            reason="Unable to analyze confidently. Please try again."
        )

@app.get("/health")
def health_check():
    return {"status": "ok"}
