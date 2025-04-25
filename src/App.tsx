import { ThemeProvider } from '@/components/theme-provider';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <DashboardLayout>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
        </div>
      </DashboardLayout>
    </ThemeProvider>
  );
}

export default App;