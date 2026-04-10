import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import JobListings from './JobListings';
import ApplicationManagement from './ApplicationManagement';
import CreateJobForm from './CreateJobForm';
import { 
  Briefcase, 
  Menu, 
  X, 
  Home, 
  MessageSquare, 
  BarChart3,
  Bell,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Jobs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/user-dashboard' },
    { icon: <Briefcase size={20} />, label: 'Jobs', active: true, path: '/jobs' },
    { icon: <MessageSquare size={20} />, label: 'Messages', path: '#' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', path: '#' },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-800/95 border-b border-slate-700 backdrop-blur-md z-40">
        <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-slate-300 hover:text-white"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
              PartTimePro
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-slate-300 hover:text-white transition">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Link to="/profile">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center text-white font-semibold cursor-pointer hover:from-indigo-700 hover:to-blue-700 transition">
                JD
              </div>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-slate-800/50 border-r border-slate-700 backdrop-blur-md transition-transform duration-300 z-30 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 space-y-2">
          {navItems.map((item, idx) => (
            <Link key={idx} to={item.path}>
              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  item.active
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            </Link>
          ))}

          <div className="pt-4 mt-4 border-t border-slate-700">
            <Link to="/profile">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all">
                <Settings size={20} />
                <span className="font-medium">Profile Settings</span>
              </button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-0 md:ml-64 pt-16 pb-8">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-2">
                <Briefcase className="text-indigo-400" size={32} />
                Jobs Management
              </h1>
              <Link to="/user-dashboard">
                <button className="flex items-center gap-2 text-slate-400 hover:text-white transition">
                  <span>Back to Dashboard</span>
                  <ChevronRight size={18} />
                </button>
              </Link>
            </div>
            <p className="text-slate-400">Explore, apply, and manage your job opportunities</p>
          </div>

          {/* Tabs */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg backdrop-blur-sm">
            <Tabs defaultValue="listings" className="w-full">
              <TabsList className="bg-slate-700/30 border-b border-slate-700 rounded-t-lg w-full justify-start p-0">
                <TabsTrigger 
                  value="listings"
                  className="rounded-none px-6 py-3 text-slate-300 data-[state=active]:text-white data-[state=active]:bg-indigo-600/20 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 transition-all"
                >
                  <Briefcase size={18} className="mr-2" />
                  Job Listings
                </TabsTrigger>
                <TabsTrigger 
                  value="applications"
                  className="rounded-none px-6 py-3 text-slate-300 data-[state=active]:text-white data-[state=active]:bg-indigo-600/20 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 transition-all"
                >
                  <MessageSquare size={18} className="mr-2" />
                  Applications
                </TabsTrigger>
                <TabsTrigger 
                  value="create"
                  className="rounded-none px-6 py-3 text-slate-300 data-[state=active]:text-white data-[state=active]:bg-indigo-600/20 data-[state=active]:border-b-2 data-[state=active]:border-indigo-500 transition-all"
                >
                  <Plus size={18} className="mr-2" />
                  Create Job
                </TabsTrigger>
              </TabsList>

              <div className="p-6">
                <TabsContent value="listings" className="mt-0">
                  <JobListings />
                </TabsContent>

                <TabsContent value="applications" className="mt-0">
                  <ApplicationManagement />
                </TabsContent>

                <TabsContent value="create" className="mt-0">
                  <CreateJobForm />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

// Plus icon fallback
const Plus = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

export default Jobs;
