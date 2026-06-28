import Header from "@/components/header"
import SkipToMain from "@/components/skip-to-main"
import MobileBottomNav from "@/components/header/mobile-bottom-nav"
import HashScrollRestore from "@/components/hash-scroll-restore"

type HomeLayoutProps = {
  children: React.ReactNode
}

export default function HomeLayout({ children }: Readonly<HomeLayoutProps>) {
  return (
    <>
      <HashScrollRestore />
      <SkipToMain />
      <Header />
      {children}
      <MobileBottomNav />
    </>
  )
}
