import { NavLink } from "@/components/NavLink";
import { Flag, Trophy, TrendingUp, Database } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Flag className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">F1 Predictor</span>
          </div>
          
          <div className="flex space-x-1">
            <NavLink
              to="/"
              className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              activeClassName="text-foreground bg-secondary"
            >
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4" />
                <span>Dashboard</span>
              </div>
            </NavLink>
            
            <NavLink
              to="/predictions"
              className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              activeClassName="text-foreground bg-secondary"
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Predictions</span>
              </div>
            </NavLink>
            
            <NavLink
              to="/data"
              className="px-4 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              activeClassName="text-foreground bg-secondary"
            >
              <div className="flex items-center space-x-2">
                <Database className="h-4 w-4" />
                <span>Data & Simulation</span>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
