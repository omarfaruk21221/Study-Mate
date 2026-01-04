const Pagination = ({
  totalItems,
  itemsPerPage = 12,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const pages = [...Array(totalPages).keys()].map((n) => n + 1);

  return (
    <div className="flex justify-center mt-8">
      <div className="join">
        {/* Previous */}
        <button
          className="join-item btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          «
        </button>

        {/* Page Numbers */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`join-item btn ${
              page === currentPage ? "btn-primary" : ""
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          className="join-item btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
