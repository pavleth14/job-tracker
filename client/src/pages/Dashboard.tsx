import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../services/jobService";
import type { Job } from "../types/job";
import JobCard from "../components/JobCard";
import JobForm from "../components/JobForm";
import DashboardStats from "../components/DashboardStats";
import DashboardHeader from "../components/DashboardHeader";
import DashboardFilters from "../components/DashboardFilters";
import Loading from "../components/Loading";
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

  const stats = {
    total: jobs.length,
    wishlist: jobs.filter((job) => job.status === "wishlist").length,
    applied: jobs.filter((job) => job.status === "applied").length,
    interview: jobs.filter((job) => job.status === "interview").length,
    offer: jobs.filter((job) => job.status === "offer").length,
    rejected: jobs.filter((job) => job.status === "rejected").length,
  };


  if (loading) {
    return (
      <div className="dashboard">
        <Loading />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <DashboardHeader onLogout={handleLogout} />

      {error && <p className="error-message">{error}</p>}

      <DashboardStats stats={stats} />

      <JobForm fetchJobs={fetchJobs} />

      <div className="dashboard-toolbar">
        <DashboardFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
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