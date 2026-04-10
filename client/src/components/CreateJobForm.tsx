import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Button } from "./ui/Button";
import { Textarea } from "./ui/TextArea";
import { AlertCircle, CheckCircle, Loader, Briefcase } from "lucide-react";
import { useAuth } from '../context/AuthContext';
import { API_ENDPOINTS } from '../config';

interface JobFormData {
  title: string;
  description: string;
  location: string;
  salary: string;
  skillsRequired: string;
  deadline: string;
  shift: string;
  role: string;
  experience: string;
  companyName: string;
}

const CreateJobForm = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user || !token) {
      navigate('/login', { replace: true });
    }
  }, [user, token, navigate]);

  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    description: '',
    location: '',
    salary: '',
    skillsRequired: '',
    deadline: '',
    shift: '',
    role: '',
    experience: '',
    companyName: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const validateForm = () => {
    if (!user) {
      setError('You must be logged in to create a job posting');
      return false;
    }

    if (isNaN(parseFloat(formData.salary))) {
      setError('Please enter a valid salary amount');
      return false;
    }

    const deadline = new Date(formData.deadline);
    if (isNaN(deadline.getTime())) {
      setError('Please enter a valid deadline date');
      return false;
    }

    if (deadline < new Date()) {
      setError('Deadline cannot be in the past');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm() || !user) {
      return;
    }

    setIsSubmitting(true);

    try {
      const jobData = {
        ...formData,
        salary: parseFloat(formData.salary),
        postedBy: user._id,
        skillsRequired: formData.skillsRequired.split(',').map(skill => skill.trim()),
      };
      
      const response = await fetch(API_ENDPOINTS.JOBS.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Use token from context
        },
        body: JSON.stringify(jobData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Job created successfully:', result);
      setSuccess(true);
      setTimeout(() => {
        handleSuccessReset();
      }, 2000);
    } catch (error) {
      console.error('Error creating job:', error);
      setError(error instanceof Error ? error.message : 'Failed to create job posting');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessReset = () => {
    setSuccess(false);
    setFormData({
      title: '',
      description: '',
      location: '',
      salary: '',
      skillsRequired: '',
      deadline: '',
      shift: '',
      role: '',
      experience: '',
      companyName: ''
    });
  };

  if (!user || !token) {
    return null;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3 text-red-300">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3 text-green-300">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-semibold">Job posted successfully! 🎉</p>
            <p className="text-sm mt-1">Your job listing is now live and visible to job seekers.</p>
          </div>
        </div>
      )}

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            Post a New Job
          </CardTitle>
          <p className="text-slate-400 text-sm mt-1">Fill in the job details below to post an opening</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-5">
              <div>
                <Label className="text-slate-300">Job Title *</Label>
                <Input 
                  id="title"
                  className="bg-slate-700/50 border-slate-600 text-white mt-1" 
                  placeholder="e.g., Plumber"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Location *</Label>
                  <Input 
                    id="location"
                    className="bg-slate-700/50 border-slate-600 text-white mt-1" 
                    placeholder="e.g., New York"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label className="text-slate-300">Shift Type *</Label>
                  <Input
                    id="shift"
                    className="bg-slate-700/50 border-slate-600 text-white mt-1"
                    placeholder="e.g., Morning, Afternoon"
                    value={formData.shift}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-slate-300">Salary ($) *</Label>
                  <Input
                    id="salary"
                    type="number"
                    className="bg-slate-700/50 border-slate-600 text-white mt-1"
                    placeholder="e.g., 25000"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Deadline *</Label>
                  <Input
                    id="deadline"
                    type="date"
                    className="bg-slate-700/50 border-slate-600 text-white mt-1"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Experience Required</Label>
                  <Input
                    id="experience"
                    className="bg-slate-700/50 border-slate-600 text-white mt-1"
                    placeholder="e.g., 2 years"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Description *</Label>
                <Textarea
                  id="description"
                  className="bg-slate-700/50 border-slate-600 text-white mt-1 min-h-24"
                  placeholder="Describe the job responsibilities, requirements, and benefits..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label className="text-slate-300">Skills Required (comma-separated) *</Label>
                <Input
                  id="skillsRequired"
                  className="bg-slate-700/50 border-slate-600 text-white mt-1"
                  placeholder="e.g., Plumbing, Pipe installation, Customer service"
                  value={formData.skillsRequired}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    'Post Job'
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateJobForm;