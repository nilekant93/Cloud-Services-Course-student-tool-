import React, { useEffect, useState } from 'react';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');

  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [classCode, setClassCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    setIsLoggedIn(!!token);
    if (storedUsername) setLoggedInUsername(storedUsername);
  }, []);

  const handleClearLocalStorage = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setLoggedInUsername('');
    toast({
      title: "LocalStorage tyhjennetty",
      description: "Kaikki tallennetut tiedot on poistettu.",
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

  const handleCreateAccount = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Salasanat eivät täsmää",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword,
          class_code: classCode,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({ title: "Account created successfully" });
        setShowCreateAccount(false);
      } else {
        toast({
          title: "Error",
          description: data.error || "Registration failed.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Server connection failed.",
        variant: "destructive",
      });
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        setLoggedInUsername(username);
        toast({
          title: "Logged in",
        });
        setIsLoggedIn(true);
      } else {
        toast({
          title: "Login failed",
          description: data.error || "Check your username and password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Server connection failed.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setLoggedInUsername('');
    toast({ title: "Logged out" });
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
            {!isLoggedIn ? (
              <>
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
                  <Button variant="default" onClick={handleLogin}>
                    Log in
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  Logged in as: <strong>{loggedInUsername}</strong>
                </p>
                <Button variant="secondary" onClick={handleLogout}>
                  Log out
                </Button>
              </div>
            )}
          </div>

          {/* Luo käyttäjä */}
          {!isLoggedIn && (
            <div className="pt-10 space-y-4 border-t border-gray-200 mt-10">
              <h2 className="text-2xl font-semibold">Create a Student Account</h2>
              <p className="text-muted-foreground font-bold">
                - IMPORTANT: Your username must follow the format "firstnamelastname". For example, Matti Meikäläinen becomes mattimeikalainen.
              </p>
              <p className="text-muted-foreground font-bold">
                - Add a number if needed (e.g. mattimeikalainen1).
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
                {showCreateAccount ? "Cancel" : "Create a student account"}
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
                  <Button variant="default" onClick={handleCreateAccount}>
                    Create Account
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
