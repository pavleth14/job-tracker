import { useState } from "react";
import { createJob } from "../services/jobService";
import "./JobForm.css";

interface JobFormProps {
    fetchJobs: () => Promise<void>;
  }

  function JobForm({ fetchJobs }: JobFormProps) {
    const [formData, setFormData] = useState({
        company: '',
        position: ''
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();      
        const job = await createJob(formData);    
        await fetchJobs();
        console.log(job);
        setFormData({
            company: '',
            position: ''
        })
      }

    return (
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
    )
}

export default JobForm;