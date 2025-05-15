import React, { useState } from 'react';
import Layout from '@/components/Layout';
import WeekContent from '@/components/WeekContent';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();

  // State backendin vastaukselle
  const [backendResponse, setBackendResponse] = useState<string | null>(null);

  // Tyhjennä LocalStorage
  const handleClearLocalStorage = () => {
    localStorage.clear();
    toast({
      title: "LocalStorage tyhjennetty",
      description: "Kaikki tallennetut testitulokset on poistettu.",
    });
    window.location.reload();
  };

  // Testaa yhteys Flask-backendiin
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

          {/* Tyhjennä LocalStorage -nappi */}
          <Button variant="destructive" onClick={handleClearLocalStorage}>
            Empty and restart progressing
          </Button>

          {/* Testaa backend-yhteys -nappi */}
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
        </div>
      </div>
    </Layout>
  );
};

export default Index;


