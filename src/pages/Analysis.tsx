import { useState } from 'react';
import { RefreshCw, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import './Analysis.css';

interface AnalysisResult {
  recommendation: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  explanation: string;
}

export default function Analysis() {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_text: inputText })
      });

      if (!response.ok) {
        throw new Error('API Response Error');
      }

      const data = await response.json();
      
      setResult({
        recommendation: data.recommendation as 'BUY' | 'SELL' | 'HOLD',
        confidence: Math.round(data.confidence * 100),
        explanation: data.reason
      });
    } catch (error) {
      console.error("AI Analysis Failed: ", error);
      setResult({
        recommendation: 'HOLD',
        confidence: 50,
        explanation: "Unable to analyze confidently. Please try again."
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderIcon = (type: string) => {
    switch(type) {
      case 'BUY': return <CheckCircle className="text-green" size={32} />;
      case 'SELL': return <AlertTriangle className="text-red" size={32} />;
      default: return <AlertCircle className="text-yellow" size={32} />;
    }
  };

  const getThemeClass = (type: string) => {
    switch(type) {
      case 'BUY': return 'theme-green';
      case 'SELL': return 'theme-red';
      default: return 'theme-yellow';
    }
  };

  return (
    <div className="analysis-page">
      <h1 className="heading-1">Market Intel Analysis</h1>
      <p className="text-muted heading-2">Deploy AI agents to parse text and extract precise market signals.</p>

      <div className="card input-card mb-8">
        <label className="form-label mb-4" style={{fontSize: '1.25rem', color: 'var(--text-main)'}}>
          Input Stock News, Press Release, or Financial Data
        </label>
        <textarea
          className="textarea-input"
          placeholder="e.g. Reliance Industries announces a $10B clean energy acquisition..."
          rows={6}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-muted">Supports up to 5000 characters.</span>
          <button 
            className="btn btn-primary" 
            onClick={handleAnalyze} 
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="spinner" size={18} />
                Processing Agents...
              </>
            ) : 'Run Analysis'}
          </button>
        </div>
      </div>

      {isAnalyzing && (
        <div className="card loading-card flex flex-col items-center justify-center py-12">
          <div className="loader mb-6"></div>
          <h3 className="heading-2">AI Agents are collaborating...</h3>
          <p className="text-muted text-sm">Parsing semantics • Running sentiment check • Calculating consensus</p>
        </div>
      )}

      {result && !isAnalyzing && (
        <div className={`card result-card ${getThemeClass(result.recommendation)}`}>
          <div className="result-header flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              {renderIcon(result.recommendation)}
              <div>
                <span className="text-sm text-muted uppercase tracking-wider block">Final Consensus</span>
                <span className={`recommendation-text ${result.recommendation === 'BUY' ? 'text-green' : result.recommendation === 'SELL' ? 'text-red' : 'text-yellow'}`}>
                  STRONG {result.recommendation}
                </span>
              </div>
            </div>

            <div className="confidence-meter-container">
              <span className="text-sm text-muted uppercase tracking-wider block mb-2 text-right">Confidence Score</span>
              <div className="confidence-bar-bg">
                <div 
                  className={`confidence-bar-fill ${getThemeClass(result.recommendation)}`} 
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
              <span className="confidence-value font-bold mt-1 text-right block">{result.confidence}%</span>
            </div>
          </div>

          <div className="explanation-section">
            <h4 className="font-semibold mb-2">Agent Synthesis</h4>
            <p className="explanation-text text-muted">{result.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
