import { useEffect } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { Button } from '../ui/Button';
import { Moon, Sun, Wallet } from 'lucide-react';
import { Select } from '../ui/Select';
import type { UserRole } from '../../types';

export const Header = () => {
  const { userRole, setUserRole, darkMode, toggleDarkMode } = useFinanceStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-white p-2 rounded-lg">
            <Wallet className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-text hidden sm:inline-block">FinanceDash</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline-block">View as:</span>
            <Select 
              className="w-[120px] h-8 text-sm"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as UserRole)}
              options={[
                { label: 'Admin', value: 'Admin' },
                { label: 'Viewer', value: 'Viewer' }
              ]}
            />
          </div>
          
          <Button variant="ghost" size="sm" onClick={toggleDarkMode} className="h-8 w-8 p-0 rounded-full">
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
};
