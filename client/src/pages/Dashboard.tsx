import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";
import type { Job } from "../types/job";

function Dashboard() {

  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      const jobs = await getJobs();
      console.log(jobs)
      setJobs(jobs)
    }
    fetchJobs();
  }, []);

    return (
      <div>
        <h1>Job Tracker Dashboard</h1>
  
        <p>
          Welcome to your job applications dashboard.
        </p>
        {jobs.map(job => (
          <div key={job._id}>
            <p>Company name: {job.company}</p>
            <p>Position: {job.position}</p>
          </div>
        ))}
      </div>
    );
  }
  
  export default Dashboard;