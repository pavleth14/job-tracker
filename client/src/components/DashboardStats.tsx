interface DashboardStatsProps {
    stats: {
      total: number;
      wishlist: number;
      applied: number;
      interview: number;
      offer: number;
      rejected: number;
    };
  }
  
  function DashboardStats({ stats }: DashboardStatsProps) {
    return (
      <div className="stats-container">
        <div className="stat-card stat-total">
          <h3>Total Jobs</h3>
          <span>{stats.total}</span>
        </div>
  
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Wishlist</h3>
            <span>{stats.wishlist}</span>
          </div>
  
          <div className="stat-card">
            <h3>Applied</h3>
            <span>{stats.applied}</span>
          </div>
  
          <div className="stat-card">
            <h3>Interview</h3>
            <span>{stats.interview}</span>
          </div>
  
          <div className="stat-card">
            <h3>Offer</h3>
            <span>{stats.offer}</span>
          </div>
  
          <div className="stat-card">
            <h3>Rejected</h3>
            <span>{stats.rejected}</span>
          </div>
        </div>
      </div>
    );
  }
  
  export default DashboardStats;