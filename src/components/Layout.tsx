
import React, { ReactNode, useState } from 'react';
import WeekSidebar from './WeekSidebar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  activeWeek?: number;
  onWeekChange?: (week: number) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className,
  activeWeek = 1,
  onWeekChange 
}) => {
  return (
    <div className="min-h-screen flex">
      <WeekSidebar 
        activeWeek={activeWeek} 
        onWeekChange={onWeekChange} 
      />
      
      <main className={cn("flex-1 p-6 md:p-10", className)}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
