
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeekSidebarProps {
  className?: string;
}

const WeekSidebar: React.FC<WeekSidebarProps> = ({ 
  className
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  
  const weeks = Array.from({ length: 8 }, (_, i) => i + 1);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const getIsActiveWeek = (week: number) => {
    if (location.pathname === "/" && week === 1) return true;
    return location.pathname === `/week${week}`;
  };

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
            <h2 className="text-xl font-semibold text-sidebar-foreground">Weekly Navigator</h2>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-3">
            <ul className="space-y-1">
              {weeks.map((week) => (
                <li key={week}>
                  <Link
                    to={week === 1 ? "/" : `/week${week}`}
                    className={cn(
                      "sidebar-item w-full text-left block px-3 py-2 rounded-md transition-colors",
                      getIsActiveWeek(week) ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-hover text-sidebar-foreground"
                    )}
                  >
                    Week {week}
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
