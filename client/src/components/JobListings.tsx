import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import { Calendar, MapPin, Briefcase, DollarSign, Loader } from "lucide-react";
import { Badge } from "./ui/Badge";
import { useAuth } from '../context/AuthContext';

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  skillsRequired: string[];
  deadline: string;
  shift: string;
}

const JobListings = () => {
  const { token } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.JOBS.LIST);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching jobs');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId: string) => {
    try {
      if (!token) {
        alert('Please login to apply for jobs');
        return;
      }

      const response = await fetch(API_ENDPOINTS.APPLICATIONS.CREATE, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ job_id: jobId })
      });

      if (!response.ok) throw new Error('Failed to apply for job');
      setAppliedJobs((prev) => [...prev, jobId]);
    } catch (err) {
      console.error('Error applying for job:', err);
      alert('Error applying for job');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-300">
        {error}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <Briefcase className="w-12 h-12 text-slate-500 mx-auto mb-3" />
        <p className="text-slate-400">No jobs available at the moment</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job._id} className="bg-slate-800/50 border-slate-700 hover:border-indigo-600/50 transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-white text-xl mb-2">{job.title}</CardTitle>
                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-indigo-400" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4 text-indigo-400" />
                    {job.shift}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    ${job.salary.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-300 text-sm leading-relaxed">{job.description}</p>
            
            <div>
              <p className="text-slate-400 text-xs font-semibold mb-2">SKILLS REQUIRED</p>
              <div className="flex flex-wrap gap-2">
                {job.skillsRequired.map((skill, index) => (
                  <Badge key={index} className="bg-indigo-600/20 text-indigo-300 border-indigo-500/30">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-700">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Calendar className="w-4 h-4" />
                Deadline: {new Date(job.deadline).toLocaleDateString()}
              </div>
              <Button
                onClick={() => handleApply(job._id)}
                disabled={appliedJobs.includes(job._id)}
                className={`${
                  appliedJobs.includes(job._id)
                    ? 'bg-green-600 text-white cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {appliedJobs.includes(job._id) ? '✓ Applied' : 'Apply Now'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobListings;
