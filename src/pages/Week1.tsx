import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleCheck } from 'lucide-react';

const Week1 = () => {
  const [urls, setUrls] = useState<{ [key: string]: string }>({
    lesson1: '',
    lesson2: '',
    assignment: ''
  });

  const [testResults, setTestResults] = useState<{ [key: string]: boolean }>({});

  const handleUrlChange = (key: string, value: string) => {
    setUrls(prev => ({ ...prev, [key]: value }));
  };

   // Uusi funktio ensimmäisen kentän testaamiseen
  const testLesson1 = async () => {
    try {
      const res = await fetch('http://localhost:3001/receive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: urls.lesson1,
          component: 'Week1'}),
      });
      if (res.ok) {
        handleMarkTested('lesson1');
      } else {
        console.error('Server error:', res.status);
      }
    } catch (err) {
      console.error('Request failed:', err);
    }
  };

  const handleMarkTested = (key: string) => {
    setTestResults(prev => {
      const updated = { ...prev, [key]: true };

      // Tallennetaan localStorageen, jos yksikin testi on tehty
      const anyTestPassed = Object.values(updated).some(Boolean);
      if (anyTestPassed) {
        localStorage.setItem('week1Tested', 'true');
      }

      return updated;
    });
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Week 1</h1>
          <p className="text-lg text-muted-foreground">
            3 deployment tasks for week 1. Insert right URL under the right task and test it.
            <b> One </b> of the tasks done is enough to get verification.
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>IaaS, PaaS and SaaS</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Click "Test URL" to mark task as done.
                </p>

                <div className="space-y-6">

                  {/* Fly.io */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">implement some basic application to Fly.io PaaS.</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                      <Input
                        placeholder="Enter resource URL"
                        value={urls.lesson1}
                        onChange={(e) => handleUrlChange('lesson1', e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={testLesson1}>
                        Test URL
                      </Button>
                    </div>
                    {testResults.lesson1 && (
                      <div className="flex items-center gap-2 text-green-600 mt-2">
                        <CircleCheck className="w-4 h-4" />
                        <span>Test passed</span>
                      </div>
                    )}
                  </div>

                  {/* Render.com */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">implement some basic application to Render.com PaaS.</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                      <Input
                        placeholder="Enter resource URL"
                        value={urls.lesson2}
                        onChange={(e) => handleUrlChange('lesson2', e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={() => handleMarkTested('lesson2')}>
                        Test URL
                      </Button>
                    </div>
                    {testResults.lesson2 && (
                      <div className="flex items-center gap-2 text-green-600 mt-2">
                        <CircleCheck className="w-4 h-4" />
                        <span>Test passed</span>
                      </div>
                    )}
                  </div>

                  {/* Linux VPS */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">setup a Linux VPS to some cloud VPS provider such as DigitalOcean, Hetzner, Oracle, Upcloud, AWS, Azure, Oracle or so.</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                      <Input
                        placeholder="Enter assignment URL"
                        value={urls.assignment}
                        onChange={(e) => handleUrlChange('assignment', e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={() => handleMarkTested('assignment')}>
                        Test URL
                      </Button>
                    </div>
                    {testResults.assignment && (
                      <div className="flex items-center gap-2 text-green-600 mt-2">
                        <CircleCheck className="w-4 h-4" />
                        <span>Test passed</span>
                      </div>
                    )}
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

export default Week1;


