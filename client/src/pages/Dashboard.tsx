import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../services/jobService";
import type { Job } from "../types/job";
import JobCard from "../components/JobCard";
import JobForm from "../components/JobForm";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Newest");

  async function fetchJobs(showLoading = false) {
    if (showLoading) {
      setLoading(true);
    }

    setError("");

    try {
      const jobs = await getJobs();
      setJobs(jobs);
    } catch (error) {
      setError("Failed to load jobs.");
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchJobs(true);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  // explore this in more deep, and remove comment down Pavle

  // 1. const filteredJobs = statusFilter === 'all' ? jobs : jobs.filter(job => job.status === statusFilter);

  // 2. const filteredJobs = jobs.filter((job) => {
  //   const matchesStatus =
  //     statusFilter === "all" || job.status === statusFilter;

  //   const matchesSearch =
  //     job.company.toLowerCase().includes(searchTerm.toLowerCase());

  //   return matchesStatus && matchesSearch;
  // });

  const filteredJobs = jobs
    .filter((job) => {
      const matchesStatus =
        statusFilter === "all" || job.status === statusFilter;

      const matchesSearch =
        job.company.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Oldest":
          return (
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime()
          );

        case "Company A-Z":
          return a.company.localeCompare(b.company);

        case "Company Z-A":
          return b.company.localeCompare(a.company);

        case "Newest":
        default:
          return (
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
          );
      }
    });


  if (loading) {
    return (
      <div className="dashboard">
        <h2>Loading jobs...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Job Tracker</h1>
          <p>Track all your job applications in one place.</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <JobForm fetchJobs={fetchJobs} />

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by company..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <div className="filter-container">
        <label htmlFor="statusFilter">
          Filter by status:
        </label>

        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="all">All</option>
          <option value="wishlist">Wishlist</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="sort-container">
        <label htmlFor="sortBy">
          Sort by:
        </label>

        <select
          id="sortBy"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
          <option value="Company A-Z">Company A-Z</option>
          <option value="Company Z-A">Company Z-A</option>
        </select>
      </div>

      <div className="jobs-list">
        {jobs.length === 0 ? (
          <div className="empty-state">
            <h2>No jobs yet</h2>
            <p>Add your first job to start tracking your applications 🚀</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              fetchJobs={fetchJobs}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;