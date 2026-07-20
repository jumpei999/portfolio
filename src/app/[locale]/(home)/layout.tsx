import HashScrollRestore from '@/components/hash-scroll-restore';
import Header from '@/components/header';
import MobileBottomNav from '@/components/header/mobile-bottom-nav';
import SkipToMain from '@/components/skip-to-main';

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: Readonly<HomeLayoutProps>) {
  return (
    <>
      <HashScrollRestore />
      <SkipToMain />
      <Header />
      {children}
      <MobileBottomNav />
    </>
  );
}
