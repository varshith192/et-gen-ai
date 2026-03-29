import { Cpu, Shield, Zap, Search, MessageSquare, ArrowRight } from 'lucide-react';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <div className="mb-10 text-center">
        <h1 className="heading-1 title-gradient mb-4">How InvestAI Works</h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Our underlying architecture leverages a robust multi-agent swarm design to decode 
          complex financial news and translate it into actionable intelligence in seconds.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-8 mb-16">
        <div className="card text-center flex flex-col items-center">
          <div className="icon-wrapper mb-4 text-primary bg-primary-light">
            <Zap size={24} />
          </div>
          <h3 className="font-semibold mb-2">Speed</h3>
          <p className="text-sm text-muted">Reduces 4 hours of reading SEC filings into a 3-second instant analysis.</p>
        </div>
        
        <div className="card text-center flex flex-col items-center">
          <div className="icon-wrapper mb-4 text-green bg-green-light">
            <Shield size={24} />
          </div>
          <h3 className="font-semibold mb-2">Confidence</h3>
          <p className="text-sm text-muted">Eliminate emotional bias. Objective scoring based purely on historical market patterns.</p>
        </div>

        <div className="card text-center flex flex-col items-center">
          <div className="icon-wrapper mb-4 text-yellow bg-yellow-light">
            <Cpu size={24} />
          </div>
          <h3 className="font-semibold mb-2">Multi-Agent</h3>
          <p className="text-sm text-muted">A distinct network of specialized AIs cross-verify claims before presenting the final verdict.</p>
        </div>
      </div>

      <div className="card flow-diagram-card">
        <h3 className="heading-2 text-center mb-8">The AI Pipeline</h3>
        
        <div className="flow-diagram">
          <div className="flow-step">
            <div className="step-box border-blue">
              <MessageSquare size={20} className="mb-2" />
              <span>Input Data</span>
            </div>
          </div>
          
          <ArrowRight className="flow-arrow" />
          
          <div className="flow-step agent-cluster text-center">
            <div className="text-sm text-muted mb-2 uppercase tracking-wider font-semibold">Agent Swarm Validation</div>
            <div className="flex gap-4">
              <div className="step-box border-purple">
                <Search size={20} className="mb-2" />
                <span>Text Parse</span>
              </div>
              <div className="step-box border-purple">
                <Cpu size={20} className="mb-2" />
                <span>Sentiment</span>
              </div>
            </div>
          </div>

          <ArrowRight className="flow-arrow" />

          <div className="flow-step">
            <div className="step-box result-box">
              <Zap size={20} className="mb-2 text-primary" />
              <span className="font-bold">Recommendation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
