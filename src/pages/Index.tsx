import React from 'react';
import Layout from '@/components/Layout';
import WeekContent from '@/components/WeekContent';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();

  const handleClearLocalStorage = () => {
    localStorage.clear();
    toast({
      title: "LocalStorage tyhjennetty",
      description: "Kaikki tallennetut testitulokset on poistettu.",
    });
    // Päivitetään sivu, jos halutaan heti näkyviin muutokset
    window.location.reload();
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
        </div>
      </div>
    </Layout>
  );
};

export default Index;

