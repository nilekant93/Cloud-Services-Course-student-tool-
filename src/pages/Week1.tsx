import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleCheck, Loader2, XCircle } from 'lucide-react';

const Week1 = () => {
  const [urls, setUrls] = useState<{ [key: string]: string }>({
    lesson1: '',
    lesson2: '',
    assignment: ''
  });

  const [testResults, setTestResults] = useState<{ [key: string]: boolean }>({});
  const [testStatus, setTestStatus] = useState<'loading' | 'passed' | 'failed' | undefined>();
  const [checkResults, setCheckResults] = useState<
    { name: string; passed: boolean; message: string }[]
  >([]);

  const handleUrlChange = (key: string, value: string) => {
    setUrls(prev => ({ ...prev, [key]: value }));
  };

const testLesson1 = async () => {
  setTestStatus('loading');
  setCheckResults([]);

  try {
    const token = localStorage.getItem('token'); // <-- Hae token
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
        'Authorization': `Bearer ${token}`, // <-- Tärkeä lisäys!
      },
      body: JSON.stringify({
        url: urls.lesson1,
        component: 'Week1',
      }),
    });

    const data = await res.json();
    console.log('Vastaus backendiltä:', data);

    if (res.ok && data.test_passed) {
      handleMarkTested('lesson1');
      setTestStatus('passed');
      await markWeekDone();
    } else {
      setTestStatus('failed');
    }

    if (data.checks) {
      setCheckResults(data.checks);
    }
  } catch (err) {
    console.error('Request failed:', err);
    setTestStatus('failed');
    setCheckResults([
      {
        name: 'Network error',
        passed: false,
        message: 'Could not connect to server',
      }
    ]);
  }
};


  const handleMarkTested = (key: string) => {
    setTestResults(prev => {
      const updated = { ...prev, [key]: true };
      const anyTestPassed = Object.values(updated).some(Boolean);
      if (anyTestPassed) {
        localStorage.setItem('week1Tested', 'true');
      }
      return updated;
    });
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
      body: JSON.stringify({ week: 'week1done' }),
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Week 1</h1>
          <p className="text-lg text-muted-foreground">
            IaaS, PaaS and SaaS, using cloud services
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fly.io or Render.com</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Enter one of the task's URL below. Test is passed if:
                  <ul className="list-disc ml-6">
                    <li>The URL is valid</li>
                    <li>Includes https</li>
                    <li>includes your username</li>
                    <li>includes either fly.dev or render.com</li>
                  </ul>
                </p>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">All tests must be passed</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                      <Input
                        placeholder="Enter resource URL"
                        value={urls.lesson1}
                        onChange={(e) => handleUrlChange('lesson1', e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={testLesson1}>Test URL</Button>
                    </div>

                    {/* Test status */}
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

                    {/* Check results list */}
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
