import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeekSidebarProps {
  className?: string;
}

const WeekSidebar: React.FC<WeekSidebarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [week1Done, setWeek1Done] = useState(false);
  const location = useLocation();

  const weeks = Array.from({ length: 8 }, (_, i) => i + 1);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const getIsActiveWeek = (week: number) => {
    return location.pathname === `/week${week}`;
  };

  useEffect(() => {
    const tested = localStorage.getItem('week1Tested') === 'true';
    setWeek1Done(tested);
  }, []);

  return (
    <div className={cn("relative h-full", className)}>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "fixed top-4 z-50 bg-background/50 backdrop-blur-sm border border-border rounded-full shadow-md",
          isOpen ? "left-[240px]" : "left-4"
        )}
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <Menu className="h-4 w-4" />
        )}
      </Button>

      <div className={cn(
        "fixed top-0 left-0 h-full bg-sidebar w-[250px] transition-transform duration-300 ease-in-out border-r border-sidebar-border z-40",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-sidebar-border">
            {/* Muutettu Link vie index-sivulle */}
            <h2 className="text-xl font-semibold text-sidebar-foreground">
              <Link to="/">Weekly Navigator</Link> {/* Tämä vie index-sivulle */}
            </h2>
          </div>

          <nav className="flex-1 overflow-y-auto p-3">
            <ul className="space-y-1">
              {weeks.map((week) => (
                <li key={week}>
                  <Link
                    to={`/week${week}`}
                    className={cn(
                      "sidebar-item w-full text-left block px-3 py-2 rounded-md transition-colors flex items-center justify-between",
                      getIsActiveWeek(week)
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "hover:bg-sidebar-hover text-sidebar-foreground"
                    )}
                  >
                    <span>Week {week}</span>
                    {week === 1 && week1Done && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <p className="text-xs text-sidebar-foreground/70">
              © 2025 Weekly Navigator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekSidebar;



