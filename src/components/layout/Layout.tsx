import type { ReactNode } from 'react';
import { Header } from './Header';
import { motion } from 'framer-motion';

type Props = {
  children: ReactNode;
  role: 'admin' | 'viewer';
  setRole: (role: 'admin' | 'viewer') => void;
};

export const Layout = ({ children, role, setRole }: Props) => {
  return (
    <div className="min-h-screen bg-transparent flex flex-col relative z-0">
      
      <div className="fixed inset-0 z-[-1] bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      
      <Header role={role} setRole={setRole} />

      <motion.main
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex-1 container mx-auto px-4 py-6 max-w-7xl"
      >
        {children}
      </motion.main>
    </div>
  );
};