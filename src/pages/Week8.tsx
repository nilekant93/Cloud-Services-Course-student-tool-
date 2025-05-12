
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Week8 = () => {
  const [urls, setUrls] = useState<{ [key: string]: string }>({
    lesson1: '',
    lesson2: '',
    assignment: ''
  });
  const { toast } = useToast();

  const handleUrlChange = (key: string, value: string) => {
    setUrls(prev => ({ ...prev, [key]: value }));
  };

  const handleTestUrl = (url: string, name: string) => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a URL first",
        variant: "destructive"
      });
      return;
    }

    // Test if the URL is valid
    try {
      new URL(url);
      window.open(url, '_blank');
      toast({
        title: "Success",
        description: `Testing URL for ${name}`,
      });
    } catch (e) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Weekly Navigator</h1>
          <p className="text-lg text-muted-foreground">
            Select a week from the sidebar to view its content. You can collapse the sidebar by clicking the menu icon.
          </p>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Week 8</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Week 8 Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  This is the detailed content for Week 8. Each week contains 
                  lessons, assignments, and resources tailored to the curriculum.
                </p>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Lesson 1: Introduction to Concepts</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                      <Input 
                        placeholder="Enter resource URL" 
                        value={urls.lesson1}
                        onChange={(e) => handleUrlChange('lesson1', e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={() => handleTestUrl(urls.lesson1, 'Lesson 1')}>
                        Test URL
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Lesson 2: Deep Dive into Applications</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                      <Input 
                        placeholder="Enter resource URL" 
                        value={urls.lesson2}
                        onChange={(e) => handleUrlChange('lesson2', e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={() => handleTestUrl(urls.lesson2, 'Lesson 2')}>
                        Test URL
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Weekly Assignment</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                      <Input 
                        placeholder="Enter assignment URL" 
                        value={urls.assignment}
                        onChange={(e) => handleUrlChange('assignment', e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={() => handleTestUrl(urls.assignment, 'Assignment')}>
                        Test URL
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Week8;
