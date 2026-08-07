const BookCard = ({ book }) => {
  return (
    <div className="bg-[#FDF8EE] border-2 border-[#1B4F82] rounded-md shadow-md overflow-hidden flex flex-col hover:-translate-y-1 transition-transform">
      <div
        className="h-36 flex items-center justify-center text-[#FDF8EE] text-sm font-semibold uppercase tracking-wide"
        style={{ backgroundColor: book.coverColor || "#1B4F82" }}
      >
        {book.genre || "Book"}
      </div>
      <div className="p-4 flex flex-col gap-1 flex-1 border-t-2 border-dashed border-[#C9A227]">
        <h3 className="font-serif font-bold text-[#1B2A3A] text-lg leading-snug">
          {book.title}
        </h3>
        <p className="text-sm text-[#5A4A3A] italic">by {book.author}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wide text-[#8A7355] font-semibold">
            {book.availableCopies} of {book.totalCopies} available
          </span>
          <span
            className={`text-xs font-bold px-2 py-1 rounded ${
              book.availableCopies > 0
                ? "bg-[#2F6B4F] text-white"
                : "bg-[#8A2C2C] text-white"
            }`}
          >
            {book.availableCopies > 0 ? "Available" : "Checked Out"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
