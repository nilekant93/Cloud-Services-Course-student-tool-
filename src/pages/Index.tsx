
import { useState } from 'react';
import Layout from '@/components/Layout';
import WeekContent from '@/components/WeekContent';

const Index = () => {
  const [activeWeek, setActiveWeek] = useState(1);

  const handleWeekChange = (week: number) => {
    setActiveWeek(week);
  };

  return (
    <Layout
      activeWeek={activeWeek}
      onWeekChange={handleWeekChange}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Weekly Navigator</h1>
          <p className="text-lg text-muted-foreground">
            Select a week from the sidebar to view its content. You can collapse the sidebar by clicking the menu icon.
          </p>
          
          <WeekContent weekNumber={activeWeek} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
