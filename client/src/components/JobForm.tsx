import { useState } from "react";
import { createJob } from "../services/jobService";
import "./JobForm.css";

interface JobFormProps {
  fetchJobs: () => Promise<void>;
}

function JobForm({ fetchJobs }: JobFormProps) {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
  });

  const [error, setError] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!formData.company.trim()) {
      setError("Company is required.");
      return;
    }

    if (!formData.position.trim()) {
      setError("Position is required.");
      return;
    }

    try {
      await createJob(formData);

      await fetchJobs();

      setFormData({
        company: "",
        position: "",
      });
    } catch (error) {
      setError("Failed to create job.");
    }
  }

  return (
    <div>
      <form className="job-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
        />

        <input
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
        />

        <button type="submit">
          Add Job
        </button>
      </form>

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}
    </div>
  );
}

export default JobForm;