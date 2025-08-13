
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Week6 = () => {
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Week 6</h1>
          <p className="text-lg text-muted-foreground">
           
          </p>
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Week 6</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Week 6 Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  
                </p>
                
                <div className="space-y-6">
                  
                  
                  
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Week6;
