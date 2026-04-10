import React, { useState, useEffect } from 'react';
import { Button } from "./ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { Input } from "./ui/Input";
import { 
  Briefcase, 
  MapPin, 
  Search, 
  Star, 
  Calendar,
  BarChart3,
  Users,
  TrendingUp,
  Clock,
  LogOut,
  Menu,
  X,
  Home,
  MessageSquare,
  Settings,
  Bell,
  ChevronRight,
  Eye,
  Download,
  ArrowUpRight
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import '../dist/Index.css';
import LogoutButton from './LogoutButton';

const UserDashboard = () => {
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

  const stats = [
    {
      label: 'Applications',
      value: '12',
      change: '+3 this week',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-indigo-600 to-indigo-400',
      bgColor: 'bg-indigo-500/10'
    },
    {
      label: 'Interviews',
      value: '4',
      change: '+1 pending',
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-600 to-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'Jobs Saved',
      value: '28',
      change: '+5 since last week',
      icon: <Star className="w-6 h-6" />,
      color: 'from-yellow-600 to-yellow-400',
      bgColor: 'bg-yellow-500/10'
    },
    {
      label: 'Profile Views',
      value: '156',
      change: '+24% increase',
      icon: <Eye className="w-6 h-6" />,
      color: 'from-green-600 to-green-400',
      bgColor: 'bg-green-500/10'
    }
  ];

  const recentJobs = [
    {
      title: 'Frontend Developer',
      company: 'TechCorp',
      status: 'Interview Scheduled',
      date: '2 days ago',
      color: 'bg-green-500/10 text-green-600'
    },
    {
      title: 'UI/UX Designer',
      company: 'DesignHub',
      status: 'Under Review',
      date: '5 days ago',
      color: 'bg-blue-500/10 text-blue-600'
    },
    {
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      status: 'Rejected',
      date: '1 week ago',
      color: 'bg-red-500/10 text-red-600'
    },
    {
      title: 'Backend Engineer',
      company: 'CloudServices',
      status: 'Applied',
      date: '3 days ago',
      color: 'bg-yellow-500/10 text-yellow-600'
    }
  ];

  const navItems = [
    { icon: <Home size={20} />, label: 'Dashboard', active: true, path: '/user-dashboard' },
    { icon: <Briefcase size={20} />, label: 'Jobs', path: '/jobs' },
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

        {/* Quick Stats in Sidebar */}
        <div className="absolute bottom-6 left-6 right-6 bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border border-indigo-500/30 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-3">Profile Completion</p>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-xs text-slate-300 mt-2">75% Complete</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-0 md:ml-64 pt-16 pb-8">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome Back! 👋</h1>
            <p className="text-slate-400">Here's what's happening with your job search today</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <Card key={idx} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                      <p className="text-4xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-slate-400 mt-2">{stat.change}</p>
                    </div>
                    <div className={`${stat.bgColor} p-3 rounded-lg text-indigo-400`}>
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Applications */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                      <Briefcase size={20} className="text-indigo-400" />
                      Recent Applications
                    </CardTitle>
                    <Link to="/jobs">
                      <button className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">
                        View All <ChevronRight size={16} />
                      </button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentJobs.map((job, idx) => (
                      <div key={idx} className="flex items-start justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition border border-slate-600/50">
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-1">{job.title}</h4>
                          <p className="text-slate-400 text-sm mb-2">{job.company}</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${job.color}`}>
                            {job.status}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-400 text-xs">{job.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Upcoming */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp size={20} className="text-blue-400" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/jobs">
                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white flex items-center justify-center gap-2">
                      <Search size={18} />
                      Browse Jobs
                    </Button>
                  </Link>
                  <Link to="/profile">
                    <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center gap-2">
                      <Settings size={18} />
                      Update Profile
                    </Button>
                  </Link>
                  <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center gap-2">
                    <Download size={18} />
                    Download Resume
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Interviews */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calendar size={20} className="text-green-400" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-green-400 text-sm font-semibold">Interview - TechCorp</p>
                    <p className="text-slate-400 text-xs mt-1">Tomorrow at 2:00 PM</p>
                  </div>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-blue-400 text-sm font-semibold">Application Deadline</p>
                    <p className="text-slate-400 text-xs mt-1">DesignHub - in 3 days</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-indigo-600/20 to-indigo-600/5 border-indigo-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm mb-2">Avg. Response Time</p>
                    <p className="text-2xl font-bold text-indigo-400">2.4 days</p>
                  </div>
                  <ArrowUpRight className="text-green-400" size={24} />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-600/20 to-blue-600/5 border-blue-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm mb-2">Success Rate</p>
                    <p className="text-2xl font-bold text-blue-400">33%</p>
                  </div>
                  <TrendingUp className="text-green-400" size={24} />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-600/20 to-purple-600/5 border-purple-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm mb-2">Profile Score</p>
                    <p className="text-2xl font-bold text-purple-400">8.5/10</p>
                  </div>
                  <Star className="text-yellow-400" size={24} />
                </div>
              </CardContent>
            </Card>
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

export default UserDashboard;