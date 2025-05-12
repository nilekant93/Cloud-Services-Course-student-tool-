
import Layout from '@/components/Layout';
import WeekContent from '@/components/WeekContent';

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto max-w-4xl">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Cloud Services - kurssin deployment testaus</h1>
          <p className="text-lg text-muted-foreground">
            Viikkokohtaiset osiot, joissa voi suorittaa deployment testejä tehtäväkohtaisesti.
          </p>
          
          <WeekContent weekNumber={1} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
