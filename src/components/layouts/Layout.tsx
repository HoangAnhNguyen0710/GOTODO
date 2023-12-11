import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';


interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-stretch">
      <div className="min-h-screen">
        <Header />
        <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1 ml-6">
                <Sidebar/>
            </div>
            <main className="min-h-[calc(100vh-80px)] col-span-3">{children ? children : <Outlet />}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;