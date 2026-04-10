import React, { useState } from 'react';
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Clock, 
  Shield, 
  Zap,
  Star,
  ChevronRight,
  Menu,
  X,
  CheckCircle
} from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
            PartTimePro
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
            <a href="#how-it-works" className="text-slate-300 hover:text-white transition">How it Works</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition">Why PartTimePro</a>
            <Link to="/login" className="text-slate-300 hover:text-white transition">Sign In</Link>
            <Link to="/signup">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700 p-4 space-y-4">
            <a href="#features" className="block text-slate-300 hover:text-white">Features</a>
            <a href="#how-it-works" className="block text-slate-300 hover:text-white">How it Works</a>
            <a href="#pricing" className="block text-slate-300 hover:text-white">Why PartTimePro</a>
            <Link to="/login" className="block text-slate-300 hover:text-white">Sign In</Link>
            <Link to="/signup">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Get Started</Button>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-16">
            <div className="inline-block">
              <span className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-4 py-2 rounded-full text-sm font-semibold">
                🚀 The Future of Part-Time Work
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              One Platform for <span className="bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">Everyone</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Whether you're looking for flexible part-time work or seeking talented professionals, PartTimePro connects you with the right opportunities.
            </p>
          </div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Job Seekers Card */}
            <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-2xl p-8 hover:border-blue-400 transition">
              <div className="mb-6">
                <div className="inline-block p-3 bg-blue-500/20 rounded-lg mb-4">
                  <Briefcase size={32} className="text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">For Job Seekers</h2>
                <p className="text-slate-300">Find flexible part-time opportunities that fit your schedule</p>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-400 mt-0.5" />
                  <span className="text-slate-200">Search & apply to hundreds of jobs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-400 mt-0.5" />
                  <span className="text-slate-200">Flexible hours that match your schedule</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-400 mt-0.5" />
                  <span className="text-slate-200">Track applications & interview schedules</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-blue-400 mt-0.5" />
                  <span className="text-slate-200">Build your professional profile</span>
                </li>
              </ul>

              <Link to="/signup">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 flex items-center justify-center gap-2">
                  Start Job Search
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>

            {/* Employers Card */}
            <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-400 transition">
              <div className="mb-6">
                <div className="inline-block p-3 bg-indigo-500/20 rounded-lg mb-4">
                  <Users size={32} className="text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">For Employers</h2>
                <p className="text-slate-300">Find and hire talented workers for your business needs</p>
              </div>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-indigo-400 mt-0.5" />
                  <span className="text-slate-200">Post job openings in minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-indigo-400 mt-0.5" />
                  <span className="text-slate-200">Access a pool of pre-verified candidates</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-indigo-400 mt-0.5" />
                  <span className="text-slate-200">Manage applicants & interviews easily</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-indigo-400 mt-0.5" />
                  <span className="text-slate-200">Analytics & hiring dashboard</span>
                </li>
              </ul>

              <Link to="/signup">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 flex items-center justify-center gap-2">
                  Post a Job
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50 border-y border-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose PartTimePro?</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Everything you need to find and manage your perfect part-time opportunity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap size={32} className="text-indigo-400" />,
                title: "Lightning Fast",
                description: "Find and apply to jobs in minutes, not days. Our intelligent matching gets you the right opportunities instantly."
              },
              {
                icon: <Shield size={32} className="text-blue-400" />,
                title: "Verified Employers",
                description: "All employers are thoroughly verified. Work with confidence knowing you're applying to legitimate companies."
              },
              {
                icon: <TrendingUp size={32} className="text-purple-400" />,
                title: "Career Growth",
                description: "Build your professional profile and track your progress. Get insights to help you advance your career."
              },
              {
                icon: <Clock size={32} className="text-pink-400" />,
                title: "Flexible Hours",
                description: "Filter jobs by your availability. Find positions that work around your schedule, not the other way around."
              },
              {
                icon: <Users size={32} className="text-green-400" />,
                title: "Community Support",
                description: "Connect with other professionals, share experiences, and get advice from a thriving community."
              },
              {
                icon: <Star size={32} className="text-yellow-400" />,
                title: "Top Rated",
                description: "Trusted by thousands of users with a 4.8★ rating. See why PartTimePro is the #1 choice."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-700/50 border border-slate-600 rounded-xl p-8 hover:border-indigo-500 transition">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-slate-400">Simple, straightforward process for everyone</p>
          </div>

          {/* Job Seekers Path */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Briefcase size={28} className="text-blue-400" />
              For Job Seekers
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Create Your Profile",
                  description: "Sign up and build your professional profile. Highlight your skills, experience, and availability.",
                  points: ["Easy registration", "Profile verification", "Skill showcase"]
                },
                {
                  step: "02",
                  title: "Browse & Apply",
                  description: "Explore thousands of opportunities tailored to your preferences and apply with one click.",
                  points: ["Smart filters", "Job matches", "Quick apply"]
                },
                {
                  step: "03",
                  title: "Get Hired & Succeed",
                  description: "Connect with employers, negotiate terms, and start your new role. Get ongoing support and grow.",
                  points: ["Direct messaging", "Contract tools", "Performance tracking"]
                }
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg p-1 mb-4">
                    <div className="bg-slate-800 rounded p-4">
                      <p className="text-4xl font-bold text-blue-400">{step.step}</p>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.points.map((point, pidx) => (
                      <li key={pidx} className="flex items-center gap-2 text-slate-300">
                        <CheckCircle size={20} className="text-blue-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Employers Path */}
          <div className="border-t border-slate-700 pt-20">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Users size={28} className="text-indigo-400" />
              For Employers
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Post a Job",
                  description: "Create a job posting in minutes. Set your requirements, budget, and preferred candidates.",
                  points: ["Quick setup", "Flexible terms", "Detailed job description"]
                },
                {
                  step: "02",
                  title: "Review Applications",
                  description: "Get matched with pre-verified candidates. Review their profiles, skills, and experience.",
                  points: ["Verified candidates", "Skill matching", "Easy filtering"]
                },
                {
                  step: "03",
                  title: "Hire & Manage",
                  description: "Interview candidates, make offers, and manage your team. Track progress and performance.",
                  points: ["Interview tools", "Contract management", "Team analytics"]
                }
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg p-1 mb-4">
                    <div className="bg-slate-800 rounded p-4">
                      <p className="text-4xl font-bold text-indigo-400">{step.step}</p>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.points.map((point, pidx) => (
                      <li key={pidx} className="flex items-center gap-2 text-slate-300">
                        <CheckCircle size={20} className="text-indigo-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600/20 to-blue-600/20 border-y border-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-indigo-400 mb-2">5000+</p>
              <p className="text-slate-300">Active Job Listings</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-400 mb-2">2500+</p>
              <p className="text-slate-300">Successful Placements</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-purple-400 mb-2">1200+</p>
              <p className="text-slate-300">Verified Employers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-pink-400 mb-2">50K+</p>
              <p className="text-slate-300">Active Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Job Seeker CTA */}
            <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase size={28} className="text-blue-400" />
                <h2 className="text-2xl font-bold text-white">Looking for Work?</h2>
              </div>
              <p className="text-slate-300 mb-6">
                Join thousands of professionals who found their ideal part-time opportunity with PartTimePro.
              </p>
              <Link to="/signup">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 flex items-center justify-center gap-2">
                  Start Job Search
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>

            {/* Employer CTA */}
            <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <Users size={28} className="text-indigo-400" />
                <h2 className="text-2xl font-bold text-white">Hiring Talent?</h2>
              </div>
              <p className="text-slate-300 mb-6">
                Find and hire qualified workers quickly. Reach thousands of active job seekers on our platform.
              </p>
              <Link to="/signup">
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 flex items-center justify-center gap-2">
                  Post a Job
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">PartTimePro</h3>
              <p className="text-slate-400">Find your perfect part-time opportunity today.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition">Browse Jobs</a></li>
                <li><a href="#" className="hover:text-white transition">Create Profile</a></li>
                <li><a href="#" className="hover:text-white transition">For Employers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p>&copy; 2026 PartTimePro. All rights reserved. Built for your success.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
