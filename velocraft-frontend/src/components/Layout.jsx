import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden w-full max-w-full">
      <Navbar />
      <main className="flex-1 min-w-0 w-full max-w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
