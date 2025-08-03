
import { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
  paddingTop?: boolean;
}

const PageLayout = ({ children, paddingTop = true }: PageLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-grow ${paddingTop ? (isMobile ? 'pt-4 pb-20' : 'pt-20') : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
