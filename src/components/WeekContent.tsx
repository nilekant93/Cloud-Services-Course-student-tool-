
import React from 'react';

interface WeekContentProps {
  weekNumber: number;
}

const WeekContent: React.FC<WeekContentProps> = ({ weekNumber }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Week {weekNumber}</h2>
      
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Content for Week {weekNumber}</h3>
        <p className="text-muted-foreground">
          This is the detailed content for Week {weekNumber}. Each week contains 
          lessons, assignments, and resources tailored to the curriculum.
        </p>
        
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-secondary/50 rounded-md">
            <h4 className="font-medium">Lesson 1</h4>
            <p className="text-sm text-muted-foreground">Introduction to the concepts</p>
          </div>
          
          <div className="p-4 bg-secondary/50 rounded-md">
            <h4 className="font-medium">Lesson 2</h4>
            <p className="text-sm text-muted-foreground">Deep dive into applications</p>
          </div>
          
          <div className="p-4 bg-secondary/50 rounded-md">
            <h4 className="font-medium">Assignment</h4>
            <p className="text-sm text-muted-foreground">Apply what you've learned</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekContent;
