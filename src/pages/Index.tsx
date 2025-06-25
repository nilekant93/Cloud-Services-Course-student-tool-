import React, { useState } from 'react';
import Layout from '@/components/Layout';
import WeekContent from '@/components/WeekContent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();

  const [backendResponse, setBackendResponse] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [classCode, setClassCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleClearLocalStorage = () => {
    localStorage.clear();
    toast({
      title: "LocalStorage tyhjennetty",
      description: "Kaikki tallennetut testitulokset on poistettu.",
    });
    window.location.reload();
  };

  const testBackendConnection = async () => {
    try {
      const res = await fetch("http://localhost:3001/ping");
      const data = await res.json();
      setBackendResponse(data.message);
      toast({
        title: "Yhteys onnistui",
        description: `Vastaus: ${data.message}`,
      });
    } catch (error) {
      console.error("Yhteysvirhe:", error);
      setBackendResponse("Yhteys epäonnistui");
      toast({
        title: "Virhe",
        description: "Yhteys Flask-backendiin epäonnistui.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Cloud Services - kurssin deployment testaus
          </h1>
          <p className="text-lg text-muted-foreground">
            Viikkokohtaiset osiot, joissa voi suorittaa deployment testejä tehtäväkohtaisesti.
          </p>

          <Button variant="destructive" onClick={handleClearLocalStorage}>
            Empty and restart progressing
          </Button>

          <div className="pt-4 space-y-2">
            <Button variant="default" onClick={testBackendConnection}>
              Testaa yhteys Flask-backendiin
            </Button>
            {backendResponse && (
              <p className="text-sm text-muted-foreground">
                Backend vastasi: {backendResponse}
              </p>
            )}
          </div>

          {/* Login-ominaisuudet */}
          <div className="pt-10 space-y-4 border-t border-gray-200 mt-10">
            <h2 className="text-2xl font-semibold">Student Login</h2>
            <p className="text-muted-foreground">
              First you must create a student account (from the next section below). If you already have an account, you can log in with your credentials below.
            </p>
            

            {/* Login-lomake */}
            <div className="space-y-3 pt-4">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="default">Log in</Button>
            </div>

            {/* Create Account -painike ja lomake */}
            <div className="pt-10 space-y-4 border-t border-gray-200 mt-10">
              <h2 className="text-2xl font-semibold">Create a Student Account</h2>
              <p className="text-muted-foreground font-bold">
              - IMPORTANT: Your username must follow the format "firstnamelastname". For example, Matti Meikäläinen becomes mattimeikalainen (do not use special characters like ä, ö, or å).
            </p>
            <p className="text-muted-foreground font-bold">
              - If the username is already taken or someone else has the same name, add a number at the end of your username (e.g., mattimeikalainen1).
            </p>
            <p className="text-muted-foreground font-bold">
              - Do NOT forget your credentials! If you do, contact your teacher.
            </p>
            <p className="text-muted-foreground">
              PLEASE ALSO NOTE: Your username must be included in the deployment URLs for the week tasks!
            </p>
              <Button
                variant="secondary"
                onClick={() => setShowCreateAccount(!showCreateAccount)}
              >
                Create a student account
              </Button>

              {showCreateAccount && (
                <div className="space-y-3 pt-4 border p-4 rounded-md">
                  <Input
                    type="text"
                    placeholder="Username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Class Code (e.g., TVT**SPO)"
                    value={classCode}
                    onChange={(e) => setClassCode(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button variant="default">Create Account</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
