import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { Search, CheckSquare, XSquare, Filter, ChevronDown, ChevronUp, Loader } from "lucide-react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config';

interface JobApplicant {
  userId: string;
  username: string;
  email: string;
  status: 'pending' | 'shortlisted' | 'interviewed' | 'hired' | 'rejected';
  appliedAt: string;
  _id: string;
}

interface Job {
  _id: string;
  title: string;
  company: string;
  applicants: JobApplicant[];
}

interface GroupedApplicants {
  jobId: string;
  jobTitle: string;
  company: string;
  applicants: JobApplicant[];
}

const ApplicationManagement = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<JobApplicant['status'] | 'all'>('all');
  const [jobs, setJobs] = useState<GroupedApplicants[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingApplicant, setUpdatingApplicant] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    fetchApplicants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch employer's jobs with applicants
      const response = await fetch(API_ENDPOINTS.JOBS.MY_JOBS, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/login', { replace: true });
          return;
        }
        throw new Error('Failed to fetch jobs');
      }

      const data = await response.json();
      
      // Transform jobs data to group applicants by job
      const groupedData: GroupedApplicants[] = data.map((job: Job) => ({
        jobId: job._id,
        jobTitle: job.title,
        company: job.company || 'Your Company',
        applicants: job.applicants || []
      }));
      
      setJobs(groupedData);
    } catch (err) {
      console.error('Error fetching applicants:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch applicants');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (jobId: string, applicantId: string, newStatus: JobApplicant['status']) => {
    try {
      setUpdatingApplicant(`${jobId}-${applicantId}`);
      
      const response = await fetch(API_ENDPOINTS.APPLICATIONS.GET_DETAIL(applicantId), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update applicant status');
      }

      // Update local state
      setJobs(prev => prev.map(job => {
        if (job.jobId === jobId) {
          return {
            ...job,
            applicants: job.applicants.map(app =>
              app._id === applicantId ? { ...app, status: newStatus } : app
            )
          };
        }
        return job;
      }));
    } catch (err) {
      console.error('Error updating status:', err);
      alert(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setUpdatingApplicant(null);
    }
  };

  const handleFilterClick = (status: JobApplicant['status'] | 'all') => {
    setSelectedStatus(status);
    setIsFilterOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <p className="text-red-600">Error: {error}</p>
          <Button onClick={fetchApplicants} className="mt-4">Retry</Button>
        </CardContent>
      </Card>
    );
  }

  if (jobs.length === 0) {
    return (
      <Card className="bg-slate-700 border-slate-600">
        <CardContent className="pt-6">
          <p className="text-slate-300">You haven't posted any jobs yet. <a href="/create-job" className="text-indigo-400 hover:underline">Create a job posting</a></p>
        </CardContent>
      </Card>
    );
  }

  // Flatten applicants from all jobs for filtering
  const allApplicants: (JobApplicant & { jobId: string; jobTitle: string; company: string })[] = [];
  jobs.forEach(job => {
    job.applicants.forEach(app => {
      allApplicants.push({ ...app, jobId: job.jobId, jobTitle: job.jobTitle, company: job.company });
    });
  });

  const filteredApplicants = allApplicants.filter(app =>
    selectedStatus === 'all' || app.status === selectedStatus
  );

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Job Applicants</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search applicants..."
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
              />
            </div>

            <div className="relative w-full md:w-[200px]">
              <Button
                variant="outline"
                className="w-full bg-slate-700 border-slate-600 text-white flex justify-between items-center hover:bg-slate-600"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <div className="flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  {selectedStatus === 'all' ? 'All statuses' : 
                    selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
                </div>
                {isFilterOpen ? 
                  <ChevronUp className="w-4 h-4 ml-2" /> : 
                  <ChevronDown className="w-4 h-4 ml-2" />
                }
              </Button>

              {isFilterOpen && (
                <div className="absolute top-full mt-1 w-full bg-slate-700 border border-slate-600 rounded-md shadow-lg p-3 z-50">
                  <div className="grid grid-cols-2 gap-2">
                    {(['all', 'pending', 'shortlisted', 'interviewed', 'hired', 'rejected'] as const).map((status) => (
                      <Button 
                        key={status} 
                        onClick={() => handleFilterClick(status)}
                        variant={selectedStatus === status ? 'default' : 'outline'}
                        className="text-xs"
                      >
                        {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredApplicants.length === 0 ? (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <p className="text-slate-300">No applicants found with status "{selectedStatus === 'all' ? 'any' : selectedStatus}"</p>
          </CardContent>
        </Card>
      ) : (
        filteredApplicants.map((applicant) => (
          <Card key={`${applicant.jobId}-${applicant._id}`} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white text-lg">{applicant.username}</CardTitle>
                  <p className="text-slate-400 text-sm">{applicant.email}</p>
                  <p className="text-slate-500 text-sm mt-1">Applied for: <span className="text-indigo-400">{applicant.jobTitle}</span></p>
                  <p className="text-slate-500 text-sm">Applied on: {new Date(applicant.appliedAt).toLocaleDateString()}</p>
                </div>
                <Badge variant={
                  applicant.status === 'hired' ? 'default' :
                  applicant.status === 'shortlisted' ? 'secondary' :
                  applicant.status === 'rejected' ? 'destructive' :
                  applicant.status === 'interviewed' ? 'outline' :
                  'outline'
                }>
                  {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center pt-2 gap-3">
                <div className="flex gap-2 flex-wrap">
                  <Button
                    size="sm"
                    onClick={() => handleStatusChange(applicant.jobId, applicant._id, 'shortlisted')}
                    disabled={updatingApplicant === `${applicant.jobId}-${applicant._id}`}
                    className={applicant.status === 'shortlisted' ? 'bg-amber-600 hover:bg-amber-700' : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'}
                    variant={applicant.status === 'shortlisted' ? 'default' : 'outline'}
                  >
                    <CheckSquare className="w-4 h-4 mr-2" />
                    {updatingApplicant === `${applicant.jobId}-${applicant._id}` ? 'Updating...' : 'Shortlist'}
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={() => handleStatusChange(applicant.jobId, applicant._id, 'interviewed')}
                    disabled={updatingApplicant === `${applicant.jobId}-${applicant._id}`}
                    className={applicant.status === 'interviewed' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'}
                    variant={applicant.status === 'interviewed' ? 'default' : 'outline'}
                  >
                    Interview
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => handleStatusChange(applicant.jobId, applicant._id, 'hired')}
                    disabled={updatingApplicant === `${applicant.jobId}-${applicant._id}`}
                    className={applicant.status === 'hired' ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-600'}
                    variant={applicant.status === 'hired' ? 'default' : 'outline'}
                  >
                    Hire
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => handleStatusChange(applicant.jobId, applicant._id, 'rejected')}
                    disabled={updatingApplicant === `${applicant.jobId}-${applicant._id}`}
                    className="bg-red-900 hover:bg-red-800 text-white border-red-700"
                    variant="outline"
                  >
                    <XSquare className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default ApplicationManagement;