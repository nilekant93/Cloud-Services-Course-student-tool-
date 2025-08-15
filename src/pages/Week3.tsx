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
  });

  const [testResults, setTestResults] = useState<{ [key: string]: boolean }>({});
  const [testStatus, setTestStatus] = useState<'loading' | 'passed' | 'failed' | undefined>();
  const [checkResults, setCheckResults] = useState<
    { name: string; passed: boolean; message: string }[]
  >([]);

  const handleUrlChange = (key: string, value: string) => {
    setUrls(prev => ({ ...prev, [key]: value }));
  };

  const testLesson = async (lessonKey: 'lesson1' | 'lesson2') => {
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
          url: urls[lessonKey],
          component: 'Week3',
          lesson: lessonKey,
        }),
      });

      const data = await res.json();
      console.log('Vastaus backendiltä:', data);

      if (res.ok && data.test_passed) {
        handleMarkTested(lessonKey);
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
      setCheckResults([{
        name: 'Network error',
        passed: false,
        message: 'Could not connect to server',
      }]);
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
        body: JSON.stringify({ week: 'week3done' }),
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Week 3</h1>
          <p className="text-lg text-muted-foreground">
            - Common cloud infrastructure services<br />
            - DNS, email<br />
            - Networking
          </p>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AWS S3 or Cloudflare Pages assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Do one of the following assignments:
                  <br />AWS S3:
                  <ul className="list-disc ml-6">
                    <li>The URL is valid</li>
                    <li>Includes your username</li>
                    <li>Includes amazonaws.com</li>
                    <li>Includes s3.amazonaws.com</li>
                    <li>includes "hello world"</li>
                  </ul>
                  <br />Cloudflare Pages:
                  <ul className="list-disc ml-6">
                    <li>The URL is valid</li>
                    <li>Includes your username</li>
                    <li>Includes pages.dev</li>
                  </ul>
                </p>

                <div className="space-y-6">

                  {/* Lesson 1 */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">AWS S3 URL</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                      <Input
                        placeholder="Your AWS S3 URL"
                        value={urls.lesson1}
                        onChange={(e) => handleUrlChange('lesson1', e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={() => testLesson('lesson1')}>
                        Test URL
                      </Button>
                    </div>
                  </div>

                  {/* Lesson 2 */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Cloudflare Pages assignment URL</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                      <Input
                        placeholder="Your cloudflare pages URL"
                        value={urls.lesson2}
                        onChange={(e) => handleUrlChange('lesson2', e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={() => testLesson('lesson2')}>
                        Test URL
                      </Button>
                    </div>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Week3;
