const AboutUs = () => {
  return (
    <div className="flex-1 bg-slate-100 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">About Shelfmark</h1>
        <p className="text-slate-600 mb-4">
          Shelfmark is a community library management platform that connects borrowers
          with a curated collection of books. Members register, get approved by our
          librarian team, and can then borrow, renew, and return books online.
        </p>
        <p className="text-slate-600">
          Our mission is to make reading accessible and organized for everyone in
          the community.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
