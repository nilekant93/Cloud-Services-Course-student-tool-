import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleCheck, Loader2, XCircle } from 'lucide-react';

const Week2 = () => {
  const [url, setUrl] = useState('');
  const [testStatus, setTestStatus] = useState<'loading' | 'passed' | 'failed' | undefined>();
  const [checkResults, setCheckResults] = useState<
    { name: string; passed: boolean; message: string }[]
  >([]);

  const testLesson = async () => {
    setTestStatus('loading');
    setCheckResults([]);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setTestStatus('failed');
        setCheckResults([{
          name: 'Authentication',
          passed: false,
          message: 'User not authenticated',
        }]);
        return;
      }

      const res = await fetch('http://localhost:3001/receive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          url: url,
          component: 'Week2',
        }),
      });

      const data = await res.json();

      if (res.ok && data.test_passed) {
        setTestStatus('passed');
        localStorage.setItem('week2Tested', 'true');
        await markWeekDone();
      } else {
        setTestStatus('failed');
      }

      if (data.checks) {
        setCheckResults(data.checks);
      }
    } catch (err) {
      setTestStatus('failed');
      setCheckResults([{
        name: 'Network error',
        passed: false,
        message: 'Could not connect to server',
      }]);
    }
  };

  const markWeekDone = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch('http://localhost:3001/mark_week_done', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ week: 'week2done' }),
      });

      if (!res.ok) {
        console.error('Failed to mark week done in database');
      }
    } catch (error) {
      console.error('Error updating week status:', error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Week 2</h1>
          <p className="text-lg text-muted-foreground">
            Operating system virtualisation,
            <br />
            Popular cloud platforms,
            <br />
            Containers
          </p>

          <Card>
            <CardHeader>
              <CardTitle>AWS Serverless tutorial</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                All tests must be passed
              </p>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    placeholder="Enter your AWS serverless URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={testLesson}>Test URL</Button>
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
                    <span><strong>Test passed. You can now move to next task.</strong></span>
                  </div>
                )}
                {testStatus === 'failed' && (
                  <div className="flex items-center gap-2 text-red-600 mt-2">
                    <XCircle className="w-4 h-4" />
                    <span>Test failed</span>
                  </div>
                )}

                {checkResults.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {checkResults.map((check, index) => (
                      <li
                        key={index}
                        className={`flex items-start gap-2 ${
                          check.passed ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {check.passed ? (
                          <CircleCheck className="w-4 h-4 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 mt-0.5" />
                        )}
                        <div>
                          {check.name}: {check.message}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Week2;
