import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Home,
  Briefcase,
  Users,
  BarChart3,
  Bell,
  Menu,
  LogOut,
  Plus,
  TrendingUp,
  Eye,
  FileText,
  MessageSquare
} from 'lucide-react';
import LogoutButton from './LogoutButton';

const EmployerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

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
      label: 'Active Job Postings',
      value: '8',
      change: '+2 this week',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'Total Applicants',
      value: '156',
      change: '+24 new applications',
      icon: <Users className="w-6 h-6" />,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10'
    },
    {
      label: 'Profile Views',
      value: '1,240',
      change: '+12% this week',
      icon: <Eye className="w-6 h-6" />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      label: 'Hired',
      value: '12',
      change: '+3 this month',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    }
  ];

  const recentApplications = [
    {
      applicantName: 'John Smith',
      position: 'Full Stack Developer',
      appliedDate: '2 hours ago',
      status: 'New',
      skills: ['React', 'Node.js', 'MongoDB'],
      statusColor: 'bg-blue-500/10 text-blue-600'
    },
    {
      applicantName: 'Sarah Johnson',
      position: 'UI/UX Designer',
      appliedDate: '5 hours ago',
      status: 'Under Review',
      skills: ['Figma', 'UI Design', 'Prototyping'],
      statusColor: 'bg-yellow-500/10 text-yellow-600'
    },
    {
      applicantName: 'Mike Davis',
      position: 'Backend Engineer',
      appliedDate: '1 day ago',
      status: 'Shortlisted',
      skills: ['Python', 'AWS', 'Docker'],
      statusColor: 'bg-green-500/10 text-green-600'
    },
    {
      applicantName: 'Emma Wilson',
      position: 'Frontend Developer',
      appliedDate: '2 days ago',
      status: 'Interview Scheduled',
      skills: ['Vue.js', 'TypeScript', 'CSS'],
      statusColor: 'bg-indigo-500/10 text-indigo-600'
    }
  ];

  const navItems = [
    { icon: <Home size={20} />, label: 'Dashboard', active: true, path: '/employer-dashboard' },
    { icon: <Briefcase size={20} />, label: 'Job Postings', path: '/employer-jobs' },
    { icon: <Users size={20} />, label: 'Applicants', path: '/employer-applicants' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', path: '/employer-analytics' },
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
              <Menu size={24} />
            </button>
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              PartTimePro
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-slate-300 hover:text-white transition">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
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
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition ${
                item.active
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}

          <div className="pt-4 mt-4 border-t border-slate-700">
            <button
              onClick={() => navigate('/employer-post-job')}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2.5 rounded-lg font-semibold transition"
            >
              <Plus size={20} />
              Post New Job
            </button>
          </div>
        </div>

        {/* Quick Stats in Sidebar */}
        <div className="absolute bottom-6 left-6 right-6 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-lg p-4">
          <p className="text-xs text-slate-400 mb-3">Account Status</p>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full w-4/5"></div>
          </div>
          <p className="text-xs text-slate-300 mt-2">80% Complete</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-0 md:ml-64 pt-16 pb-8">
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome back, {user?.username}! 👋
            </h1>
            <p className="text-slate-400">Here's what's happening with your hiring</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition"
              >
                <div className={`inline-flex p-3 rounded-lg ${stat.bgColor} mb-4`}>
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.label}</h3>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Applications */}
            <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Users size={24} className="text-blue-400" />
                  Recent Applications
                </h2>
                <button className="text-slate-400 hover:text-white transition text-sm">
                  View All →
                </button>
              </div>

              <div className="space-y-4">
                {recentApplications.map((app, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-slate-500 transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-white font-semibold">{app.applicantName}</h3>
                        <p className="text-slate-400 text-sm">{app.position}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${app.statusColor}`}
                      >
                        {app.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {app.skills.map((skill, sidx) => (
                        <span
                          key={sidx}
                          className="px-2 py-1 bg-slate-600/50 rounded text-xs text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">Applied {app.appliedDate}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              {/* Posted Jobs */}
              <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Briefcase size={20} className="text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold">Active Postings</h3>
                </div>
                <p className="text-3xl font-bold text-white mb-2">8</p>
                <p className="text-slate-400 text-sm mb-4">Jobs currently open</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2">
                  <Plus size={16} />
                  Post New Job
                </button>
              </div>

              {/* Hiring Stats */}
              <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <TrendingUp size={20} className="text-green-400" />
                  </div>
                  <h3 className="text-white font-semibold">This Month</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-slate-300">Applications</p>
                    <p className="text-white font-bold">+24</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-slate-300">Shortlisted</p>
                    <p className="text-white font-bold">+8</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-slate-300">Hired</p>
                    <p className="text-white font-bold">+3</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-slate-700 rounded-lg">
                    <MessageSquare size={20} className="text-slate-300" />
                  </div>
                  <h3 className="text-white font-semibold">Messages</h3>
                </div>
                <p className="text-3xl font-bold text-white mb-2">5</p>
                <p className="text-slate-400 text-sm">Unread messages</p>
              </div>
            </div>
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

export default EmployerDashboard;
