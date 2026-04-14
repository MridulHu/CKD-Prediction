import { Activity } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-foreground">
            KidneyHealth<span className="text-primary">AI</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            to="/predict"
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            Predict
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
