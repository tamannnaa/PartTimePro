import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Badge } from './ui/Badge';
import { 
  Calendar, 
  MapPin, 
  Briefcase, 
  Mail, 
  Phone, 
  Upload,
  Menu,
  X,
  Home,
  MessageSquare,
  BarChart3,
  Bell,
  Settings,
  ChevronRight,
  Save,
  Edit2,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

interface ProfileData {
  _id?: string;
  username?: string;
  name?: string;
  photo?: string;
  email?: string;
  phone?: string;
  location?: string;
  skills?: string[];
  experience?: {
    title: string;
    company: string;
    duration: string;
  }[];
  availability?: {
    days: string[];
    times: string;
  };
  preferredJobType?: string;
  resume?: string | null;
}

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [newSkill, setNewSkill] = useState('');

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch(API_ENDPOINTS.USERS.PROFILE, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        setProfileData({
          ...data,
          name: data.username || data.name || 'User',
          photo: data.photo || 'https://via.placeholder.com/96',
          phone: data.phone || '',
          location: data.location || 'Not Provided',
          skills: data.skills || [],
          experience: data.experience || [],
          availability: data.availability || { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], times: 'Flexible' },
          preferredJobType: data.preferredJobType || 'Full-time',
          resume: data.resume || null
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(API_ENDPOINTS.USERS.PROFILE, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const result = await response.json();
      console.log(result.message);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => prev ? {
          ...prev,
          photo: reader.result as string
        } as ProfileData : null);
      };
      reader.readAsDataURL(file);
    }
  };

  const navItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/user-dashboard' },
    { icon: <Briefcase size={20} />, label: 'Jobs', path: '/jobs' },
    { icon: <MessageSquare size={20} />, label: 'Messages', path: '#' },
    { icon: <BarChart3 size={20} />, label: 'Analytics', path: '#' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error loading profile</p>
          <Link to="/user-dashboard">
            <Button className="bg-indigo-600 hover:bg-indigo-700">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

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
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center text-white font-semibold">
              {profileData.username?.[0]?.toUpperCase() || 'U'}
            </div>
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
                  item.label === 'Profile Settings'
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
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-600 text-white transition-all">
              <Settings size={20} />
              <span className="font-medium">Profile Settings</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-0 md:ml-64 pt-16 pb-8">
        <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-2">
                <User className="text-indigo-400" size={32} />
                Your Profile
              </h1>
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-2 ${
                    isEditing
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {isEditing ? (
                    <>
                      <X size={18} />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit2 size={18} />
                      Edit Profile
                    </>
                  )}
                </Button>
                {isEditing && (
                  <Button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save Changes
                  </Button>
                )}
              </div>
            </div>
            <p className="text-slate-400">Manage your professional information</p>
          </div>

          {/* Basic Information */}
          <Card className="bg-slate-800/50 border-slate-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-indigo-600/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-indigo-400" />
                </div>
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="relative">
                  <img
                    src={profileData.photo}
                    alt={profileData.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
                  />
                  {isEditing && (
                    <label htmlFor="photo-upload" className="absolute bottom-0 right-0 cursor-pointer">
                      <div className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors">
                        <Upload className="w-4 h-4" />
                      </div>
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  )}
                </div>
                <div className="flex-1 w-full space-y-4">
                  <div>
                    <Label className="text-slate-300">Name</Label>
                    <Input
                      value={profileData.name || ''}
                      readOnly={!isEditing}
                      className="bg-slate-700/50 border-slate-600 text-white mt-1"
                      onChange={(e) => setProfileData(prev => prev ? ({ ...prev, name: e.target.value } as ProfileData) : null)}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Email</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                        <Input
                          value={profileData.email || ''}
                          readOnly={!isEditing}
                          className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                          onChange={(e) => setProfileData(prev => prev ? ({ ...prev, email: e.target.value } as ProfileData) : null)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-slate-300">Phone</Label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                        <Input
                          value={profileData.phone || ''}
                          readOnly={!isEditing}
                          className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                          onChange={(e) => setProfileData(prev => prev ? ({ ...prev, phone: e.target.value } as ProfileData) : null)}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-300">Location</Label>
                    <div className="relative mt-1">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <Input
                        value={profileData.location || ''}
                        readOnly={!isEditing}
                        className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                        onChange={(e) => setProfileData(prev => prev ? ({ ...prev, location: e.target.value } as ProfileData) : null)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Experience */}
          <Card className="bg-slate-800/50 border-slate-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-indigo-600/20 flex items-center justify-center">
                  <Briefcase className="h-4 w-4 text-indigo-400" />
                </div>
                Skills & Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-slate-300 mb-3 block">Skills</Label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profileData.skills?.map((skill, index) => (
                    <Badge key={index} className="bg-indigo-600/20 text-indigo-300 border-indigo-500/30">
                      {skill}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a new skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="flex-1 bg-slate-700/50 border-slate-600 text-white"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newSkill.trim()) {
                          setProfileData(prev => prev ? ({
                            ...prev,
                            skills: [...(prev.skills || []), newSkill.trim()]
                          } as ProfileData) : null);
                          setNewSkill('');
                        }
                      }}
                    />
                    <Button
                      onClick={() => {
                        if (newSkill.trim()) {
                          setProfileData(prev => prev ? ({
                            ...prev,
                            skills: [...(prev.skills || []), newSkill.trim()]
                          } as ProfileData) : null);
                          setNewSkill('');
                        }
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      Add
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Availability & Preferences */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-indigo-600/20 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-indigo-400" />
                </div>
                Availability & Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-slate-300 mb-3 block">Available Days</Label>
                <div className="flex flex-wrap gap-2">
                  {profileData.availability?.days?.map((day, index) => (
                    <Badge key={index} className="bg-green-600/20 text-green-300 border-green-500/30">
                      <Calendar className="w-3 h-3 mr-1" />
                      {day}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-slate-300 mb-2 block">Preferred Job Type</Label>
                <div className="flex items-center gap-2 p-3 bg-slate-700/30 rounded-lg border border-slate-600">
                  <Briefcase className="w-4 h-4 text-indigo-400" />
                  <span className="text-slate-200">{profileData.preferredJobType || 'Not specified'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
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

export default UserProfile;
