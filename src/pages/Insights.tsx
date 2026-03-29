import { Clock, ExternalLink } from 'lucide-react';
import './Insights.css';

export default function Insights() {
  const history = [
    {
      id: 1,
      ticker: 'TCS',
      summary: 'Q3 earnings beat estimates by 15%. Cloud transformation bookings hit record high.',
      recommendation: 'BUY',
      timestamp: '2 hours ago',
      confidence: 89
    },
    {
      id: 2,
      ticker: 'ZOMATO',
      summary: 'Blinkit integration showing positive unit economics. Profitability sustained for 3rd quarter.',
      recommendation: 'BUY',
      timestamp: '5 hours ago',
      confidence: 82
    },
    {
      id: 3,
      ticker: 'IDEA',
      summary: 'Debt restructuring talks delayed. Subscriber loss continues in urban circles.',
      recommendation: 'SELL',
      timestamp: '1 day ago',
      confidence: 94
    },
    {
      id: 4,
      ticker: 'WIPRO',
      summary: 'New CEO announced amidst margin pressure. Transitional phase expected for next 2 quarters.',
      recommendation: 'HOLD',
      timestamp: '2 days ago',
      confidence: 65
    }
  ];

  return (
    <div className="insights-page">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="heading-1" style={{marginBottom: '0.5rem'}}>Historical Insights</h1>
          <p className="text-muted heading-2">Review past AI analysis logs.</p>
        </div>
        <button className="btn" style={{backgroundColor: 'var(--card-border)', color: 'var(--text-main)'}}>
          <Clock size={16} /> Filter by Time
        </button>
      </div>

      <div className="insights-grid grid grid-cols-2 gap-6">
        {history.map(item => (
          <div key={item.id} className="card historical-card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-sm text-muted flex items-center gap-1 mb-1">
                  <Clock size={14} /> {item.timestamp}
                </span>
                <span className="stock-ticker block">{item.ticker}</span>
              </div>
              <span className={`badge ${
                item.recommendation === 'BUY' ? 'bg-buy text-green' : 
                item.recommendation === 'SELL' ? 'bg-sell text-red' : 
                'bg-hold text-yellow'
              }`}>
                {item.recommendation} ({item.confidence}%)
              </span>
            </div>
            
            <p className="text-sm text-muted historical-summary mb-4">"{item.summary}"</p>
            
            <div className="flex justify-end">
              <button className="btn-text">
                View Full Log <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
