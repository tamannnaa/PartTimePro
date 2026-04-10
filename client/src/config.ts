/**
 * API Configuration
 * Centralized API endpoint configuration for the application
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
    REGISTER: `${API_BASE_URL}/api/v1/auth/register`,
    VERIFY_TOKEN: `${API_BASE_URL}/api/v1/auth/verify-token`,
    LOGOUT: `${API_BASE_URL}/api/v1/auth/logout`,
  },
  USERS: {
    PROFILE: `${API_BASE_URL}/api/v1/users/profile`,
    GET_USER: (userId: number) => `${API_BASE_URL}/api/v1/users/${userId}`,
    GET_EMPLOYER: (employerId: number) => `${API_BASE_URL}/api/v1/users/employer/${employerId}`,
  },
  JOBS: {
    LIST: `${API_BASE_URL}/api/v1/jobs`,
    CREATE: `${API_BASE_URL}/api/v1/jobs`,
    GET_DETAIL: (jobId: number | string) => `${API_BASE_URL}/api/v1/jobs/${jobId}`,
    MY_JOBS: `${API_BASE_URL}/api/v1/jobs/employer/my-jobs`,
  },
  APPLICATIONS: {
    CREATE: `${API_BASE_URL}/api/v1/applications`,
    GET_DETAIL: (appId: number | string) => `${API_BASE_URL}/api/v1/applications/${appId}`,
    GET_JOB_APPLICATIONS: (jobId: number | string) =>
      `${API_BASE_URL}/api/v1/applications/job/${jobId}`,
    GET_MY_APPLICATIONS: `${API_BASE_URL}/api/v1/applications/worker/my-applications`,
  },
};

export default API_BASE_URL;
