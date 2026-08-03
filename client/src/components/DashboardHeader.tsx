interface DashboardHeaderProps {
    onLogout: () => void;
  }
  
  function DashboardHeader({ onLogout }: DashboardHeaderProps) {
    return (
      <div className="dashboard-header">
        <div>
          <h1>Job Tracker</h1>
          <p>Track all your job applications in one place.</p>
        </div>
  
        <button
          className="logout-btn"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    );
  }
  
  export default DashboardHeader;