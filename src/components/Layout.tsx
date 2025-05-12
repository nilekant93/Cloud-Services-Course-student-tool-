
import React, { ReactNode } from 'react';
import WeekSidebar from './WeekSidebar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className
}) => {
  return (
    <div className="min-h-screen flex">
      <WeekSidebar />
      
      <main className={cn("flex-1 p-6 md:p-10", className)}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
