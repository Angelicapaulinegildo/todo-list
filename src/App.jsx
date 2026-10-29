import { Routes, Route, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import TaskGroups from './pages/TaskGroups';
import GroupTasks from './pages/GroupTasks';
import UserGuide from './pages/UserGuide';
import Developers from './pages/Developers';

// Classic SVG Icons
const IconHome = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const IconFolder = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>;
const IconBook = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const IconUsers = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const IconCheck = () => <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>;

function Layout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsMobileOpen(false); }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: <IconHome /> },
    { to: '/groups', label: 'Task Groups', icon: <IconFolder /> },
    { to: '/guide', label: 'User Guide', icon: <IconBook /> },
    { to: '/developers', label: 'Developers', icon: <IconUsers /> },
  ];

  return (
    <div className="flex min-h-screen bg-paper">
      {isMobileOpen && (
        <div className="fixed inset-0 bg-ink/50 z-40 md:hidden" onClick={() => setIsMobileOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-white border-r border-border w-64 p-6 flex flex-col z-50 transition-transform duration-300 md:static md:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center flex-shrink-0">
            <IconCheck />
          </div>
          <div>
            <h1 className="text-lg leading-tight">ToDoList</h1>
            <span className="text-xs text-muted font-medium">Task Manager</span>
          </div>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1">
          {navLinks.map((link) => (
            <NavLink 
              key={link.to} 
              to={link.to}
              className={({ isActive }) => `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[15px] font-medium transition-colors ${isActive ? 'bg-[#EAE5DD] text-navy' : 'text-muted hover:bg-paper hover:text-ink'}`}
            >
              {link.icon} {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-border sticky top-0 z-30">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
                <IconCheck />
             </div>
             <span className="font-serif font-semibold">ToDoList</span>
          </div>
          <button onClick={() => setIsMobileOpen(true)} className="text-navy p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </header>

        <div className="p-4 md:p-10 max-w-5xl mx-auto w-full flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="groups" element={<TaskGroups />} />
        <Route path="groups/:groupId" element={<GroupTasks />} />
        <Route path="guide" element={<UserGuide />} />
        <Route path="developers" element={<Developers />} />
      </Route>
    </Routes>
  );
}