import { Footer, Header } from "..";

interface LayoutProps {
    children?: React.ReactNode
}
function Layout({children}: LayoutProps) {
  return (
    <>
      <Header />
      <div className=" max-w-7xl mx-auto font-montserrat bg-slate-200 h-screen">
        <div className="p-4">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
