interface DashboardFiltersProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  
    statusFilter: string;
    setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  
    sortBy: string;
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
  }
  
  function DashboardFilters({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
  }: DashboardFiltersProps) {
    return (
      <div className="dashboard-filters">
  
        <div className="filter-group search-group">
          <input
            type="text"
            placeholder="🔍 Search by company..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
  
        <div className="filter-group">
          <label htmlFor="statusFilter">
            Filter
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
  
        <div className="filter-group">
          <label htmlFor="sortBy">
            Sort
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
  
      </div>
    );
  }
  
  export default DashboardFilters;