const BookCard = ({ book }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
      <div
        className="h-40 flex items-center justify-center text-white text-sm font-semibold"
        style={{ backgroundColor: book.coverColor || "#1B4F82" }}
      >
        {book.genre || "Book"}
      </div>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <h3 className="font-bold text-slate-900">{book.title}</h3>
        <p className="text-sm text-slate-600">by {book.author}</p>
        <p className="text-xs text-slate-500 mt-1">
          {book.availableCopies} of {book.totalCopies} available
        </p>
      </div>
    </div>
  );
};

export default BookCard;
