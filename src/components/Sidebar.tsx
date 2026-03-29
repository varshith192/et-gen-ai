import { NavLink } from 'react-router-dom';
import { Home, LineChart, LayoutDashboard, Info, Zap } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Zap className="sidebar-logo-icon" />
        <h1 className="sidebar-title">InvestAI</h1>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink 
          to="/" 
          className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}
          end
        >
          <Home className="nav-icon" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/analysis" 
          className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <LineChart className="nav-icon" />
          <span>Analysis</span>
        </NavLink>

        <NavLink 
          to="/insights" 
          className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard className="nav-icon" />
          <span>Insights</span>
        </NavLink>

        <NavLink 
          to="/about" 
          className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Info className="nav-icon" />
          <span>About AI</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="status-indicator">
          <span className="pulse-dot"></span>
          <span>System Online</span>
        </div>
      </div>
    </aside>
  );
}
