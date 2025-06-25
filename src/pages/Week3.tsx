import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleCheck, Loader2, XCircle } from 'lucide-react';

const Week3 = () => {
  const [urls, setUrls] = useState<{ [key: string]: string }>({
    lesson1: '',
    lesson2: '',
    assignment: ''
  });

  const [testResults, setTestResults] = useState<{ [key: string]: boolean }>({});
  const [testStatus, setTestStatus] = useState<'loading' | 'passed' | 'failed' | undefined>();

  const handleUrlChange = (key: string, value: string) => {
    setUrls(prev => ({ ...prev, [key]: value }));
  };

  const testLesson1 = async () => {
    setTestStatus('loading');
    try {
      const res = await fetch('http://localhost:3001/receive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: urls.lesson1,
          component: 'Week3'
        }),
      });

      const data = await res.json();
      console.log('Vastaus backendiltä:', data);

      if (res.ok && data.test_passed) {
        handleMarkTested('lesson1');
        setTestStatus('passed');
      } else {
        setTestStatus('failed');
      }
    } catch (err) {
      console.error('Request failed:', err);
      setTestStatus('failed');
    }
  };

  const handleMarkTested = (key: string) => {
    setTestResults(prev => {
      const updated = { ...prev, [key]: true };
      const anyTestPassed = Object.values(updated).some(Boolean);
      if (anyTestPassed) {
        localStorage.setItem('week3Tested', 'true');
      }
      return updated;
    });
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Week 3</h1>
          <p className="text-lg text-muted-foreground">
            - Common cloud infrastructure services
            <br />
            - DNS, email
            <br />
            - Networking
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AWS S3 assignment, Tailscale VPN assignment or Cloudflare Pages assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Enter one of the task's URL below. If the test is passed, you will get a verification.
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
                    {testStatus === 'loading' && (
                      <div className="flex items-center gap-2 text-blue-600 mt-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Testing...</span>
                      </div>
                    )}
                    {testStatus === 'passed' && (
                      <div className="flex items-center gap-2 text-green-600 mt-2">
                        <CircleCheck className="w-4 h-4" />
                        <span>Test passed</span>
                      </div>
                    )}
                    {testStatus === 'failed' && (
                      <div className="flex items-center gap-2 text-red-600 mt-2">
                        <XCircle className="w-4 h-4" />
                        <span>Test failed</span>
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

export default Week3;
