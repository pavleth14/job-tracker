import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../services/jobService";
import type { Job } from "../types/job";
import JobCard from "../components/JobCard";
import JobForm from "../components/JobForm";
import "./Dashboard.css";

function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  async function fetchJobs() {
    setError("");
  
    try {
      const jobs = await getJobs();
      setJobs(jobs);
    } catch (error) {
      setError("Failed to load jobs.");
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Job Tracker</h1>
          <p>Track all your job applications in one place.</p>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <JobForm fetchJobs={fetchJobs} />
      {error && <p className="error-message">{error}</p>}

      <div className="jobs-list">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            fetchJobs={fetchJobs}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;