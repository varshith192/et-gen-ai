import { ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="heading-1">Opportunity Radar</h1>
        <p className="text-muted heading-2">AI-driven actionable intelligence for retail investors.</p>
      </header>

      <section className="dashboard-hero card flex flex-col items-center justify-center">
        <div className="hero-content">
          <h2 className="hero-title">Decide with Confidence</h2>
          <p className="hero-subtitle">
            Paste any market news or stock press release. Our multi-agent AI will analyze the sentiment and core fundamentals 
            to generate an instant BUY, SELL, or HOLD recommendation.
          </p>
          <button className="btn btn-primary mt-4" onClick={() => navigate('/analysis')}>
            Start Analysis
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <div className="recent-activity-title mt-8 mb-4">
        <h3 className="heading-2">Recent AI Intel</h3>
      </div>
      
      <section className="dashboard-grid grid grid-cols-3 gap-6">
        <div className="card intel-card">
          <div className="flex justify-between items-center mb-4">
            <span className="stock-ticker">RELIANCE</span>
            <span className="badge bg-buy text-green">BUY</span>
          </div>
          <p className="text-muted text-sm mb-4">Major renewable energy partnership announced. Positive long-term cash flow projected.</p>
          <div className="flex items-center gap-2 text-green font-semibold">
            <TrendingUp size={16} />
            <span>92% Confidence</span>
          </div>
        </div>

        <div className="card intel-card">
          <div className="flex justify-between items-center mb-4">
            <span className="stock-ticker">PAYTM</span>
            <span className="badge bg-sell text-red">SELL</span>
          </div>
          <p className="text-muted text-sm mb-4">Regulatory headwind escalates. RBI imposes stringent sanctions impacting core operations.</p>
          <div className="flex items-center gap-2 text-red font-semibold">
            <TrendingDown size={16} />
            <span>88% Confidence</span>
          </div>
        </div>

        <div className="card intel-card">
          <div className="flex justify-between items-center mb-4">
            <span className="stock-ticker">HDFCBANK</span>
            <span className="badge bg-hold text-yellow">HOLD</span>
          </div>
          <p className="text-muted text-sm mb-4">Quarterly earnings align with expectations. NIM slightly compressed but overall stability maintained.</p>
          <div className="flex items-center gap-2 text-yellow font-semibold">
            <Minus size={16} />
            <span>75% Confidence</span>
          </div>
        </div>
      </section>
    </div>
  );
}
