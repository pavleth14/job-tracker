import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";
import type { Job } from "../types/job";
import JobCard from "../components/JopCard";
import JobForm from "../components/JobForm";
import "./Dashboard.css";

function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);

  async function fetchJobs() {
    const jobs = await getJobs();
    setJobs(jobs);
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="dashboard">
      <h1>Job Tracker</h1>

      <p>Track all your job applications in one place.</p>

      <JobForm fetchJobs={fetchJobs} />

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