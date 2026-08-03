import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex-1 bg-slate-100">
      <section className="bg-slate-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold text-amber-400 mb-4">
          Welcome to Shelfmark
        </h1>
        <p className="text-slate-300 max-w-xl mx-auto mb-6">
          Discover, borrow, and manage books with ease — your community library, online.
        </p>
        <Link
          to="/books"
          className="bg-amber-400 text-slate-900 font-semibold px-6 py-3 rounded hover:bg-amber-300"
        >
          Browse the Catalog
        </Link>
      </section>
    </div>
  );
};

export default Home;
