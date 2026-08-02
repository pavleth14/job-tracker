import type { Job } from "../types/job";
import { updateJob } from "../services/jobService";
import { deleteJob } from "../services/jobService";
import "./JobCard.css";

interface JobCardProps {
  job: Job;
  fetchJobs: () => Promise<void>;
}

function JobCard({ job, fetchJobs }: JobCardProps) {

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      await updateJob(job._id, e.target.value);
      await fetchJobs();
    } catch (error) {
      alert("Failed to update job status.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteJob(job._id);
      await fetchJobs();
    } catch (error) {
      alert("Failed to delete job.");
    }
  };

  return (
    <div className="job-card">

      <div className="job-info">
        <p>{job.company}</p>
        <p>{job.position}</p>
        <p>{job.status}</p>
      </div>

      <div className="job-actions">

        <select
          value={job.status}
          onChange={handleStatusChange}
        >
          <option value="wishlist">Wishlist</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>

        <button onClick={handleDelete}>
          Delete
        </button>

      </div>

    </div>

  );
}

export default JobCard;