import { useState } from "react";
import type { Job } from "../types/job";
import { updateJob } from "../services/jobService";
import { deleteJob } from "../services/jobService";
import { toast } from "react-toastify";
import ConfirmModal from "./ConfirmModal";
import "./JobCard.css";

interface JobCardProps {
  job: Job;
  fetchJobs: () => Promise<void>;
}

function JobCard({ job, fetchJobs }: JobCardProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      await updateJob(job._id, e.target.value);
      await fetchJobs();
      toast.success("Status updated.");
    } catch (error) {
      toast.error("Failed to update job status.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteJob(job._id);

      await fetchJobs();

      toast.success("Job deleted.");

      setIsModalOpen(false);

    } catch (error) {
      toast.error("Failed to delete job.");
    }
  };

  return (
    <div className="job-card">

      <div className="job-info">
        <p>{job.company}</p>
        <p>{job.position}</p>
        <p>
          Status:
          <span className={`status-badge ${job.status}`}>
            {job.status}
          </span>
        </p>
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

        <button onClick={() => setIsModalOpen(true)}>
          Delete
        </button>

      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete Job"
        message="Are you sure you want to delete this job?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onClose={() => setIsModalOpen(false)}
      />
      
    </div>

  );
}

export default JobCard;