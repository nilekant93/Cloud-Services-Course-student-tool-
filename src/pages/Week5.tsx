import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleCheck, Loader2, XCircle } from 'lucide-react';

const Week5 = () => {
  const [urls, setUrls] = useState<{ readmeUrl: string; siteUrl: string }>({
    readmeUrl: '',
    siteUrl: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [testStatus, setTestStatus] = useState<'loading' | 'passed' | 'failed' | undefined>();
  const [checkResults, setCheckResults] = useState<
    { name: string; passed: boolean; message: string }[]
  >([]);

  const handleUrlChange = (key: 'readmeUrl' | 'siteUrl', value: string) => {
    setUrls(prev => ({ ...prev, [key]: value }));
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
        body: JSON.stringify({ week: 'week5done' }),
      });

      if (!res.ok) {
        console.error('Failed to mark week done in database');
      }
    } catch (error) {
      console.error('Error updating week status:', error);
    }
  };

  const testBothUrls = async () => {
    setError(null);
    setTestStatus(undefined);
    setCheckResults([]);

    if (!urls.readmeUrl.trim() || !urls.siteUrl.trim()) {
      setError('Both URLs must be provided.');
      return;
    }

    setTestStatus('loading');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setTestStatus('failed');
        setCheckResults([
          {
            name: 'Authentication',
            passed: false,
            message: 'User not authenticated',
          },
        ]);
        return;
      }

      const res = await fetch('http://localhost:3001/receive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          readmeUrl: urls.readmeUrl,
          siteUrl: urls.siteUrl,
          component: 'Week5',
        }),
      });

      const data = await res.json();
      console.log('Response from backend:', data);

      if (res.ok && data.test_passed) {
        setTestStatus('passed');
        localStorage.setItem('week5Tested', 'true');
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
        },
      ]);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Week 5</h1>
          <p className="text-lg text-muted-foreground">
            - Github Pages & Markdown static site assignment<br />
            - Submit both the public website URL and the README.md raw URL
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Submit URLs for testing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Public GitHub Pages URL</h3>
                  <Input
                    placeholder="Your public GitHub Pages URL"
                    value={urls.siteUrl}
                    onChange={(e) => handleUrlChange('siteUrl', e.target.value)}
                    className="flex-1"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Raw README.md URL</h3>
                  <Input
                    placeholder="Your README.md raw URL"
                    value={urls.readmeUrl}
                    onChange={(e) => handleUrlChange('readmeUrl', e.target.value)}
                    className="flex-1"
                  />
                </div>

                {error && (
                  <div className="text-red-600 font-semibold">{error}</div>
                )}

                <Button onClick={testBothUrls}>Test URLs</Button>

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

export default Week5;
