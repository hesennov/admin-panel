interface ReusablePaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function ReusablePagination({
  page,
  totalPages,
  onChange,
}: ReusablePaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        className="px-3 py-1 border raunded disabled:opacity-50"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
      >
        prev
      </button>

      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => onChange(pageNumber)}
            className={`px-3 py-1 rounded border ${page === pageNumber ? "bg-blue-600 text-white" : "bg-white"}`}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        className="px-3 py-1 rounded border  disabled:opacity-50"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
      >
        next
      </button>
    </div>
  );
}
