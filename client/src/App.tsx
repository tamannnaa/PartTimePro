import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UserDashboard from "./components/UserDashboard";
import EmployerDashboard from "./components/EmployerDashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile"
import {AuthProvider} from "./context/AuthContext"
import Jobs from "./components/Jobs";
import CreateJobForm from "./components/CreateJobForm";
import ApplicationManagement from "./components/ApplicationManagement";

function App() {
  return (
    <div >
      <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Register/>} />
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/user-dashboard" element={<UserDashboard/>}/>
        <Route path="/employer-dashboard" element={<EmployerDashboard/>}/>
        <Route path="/employer-post-job" element={<CreateJobForm/>}/>
        <Route path="/employer-jobs" element={<CreateJobForm/>}/>
        <Route path="/employer-analytics" element={<EmployerDashboard/>}/>
        <Route path="/employer-applicants" element={<ApplicationManagement/>}/>
      </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
