const AboutUs = () => {
  return (
    <div className="flex-1 bg-[#0F2A44] py-16 px-6">
      <div className="max-w-3xl mx-auto bg-[#FDF8EE] border-4 border-[#C9A227] rounded-md shadow-xl p-8 mb-10">
        <h1 className="text-3xl font-serif font-bold text-[#1B2A3A] mb-4">
          About Shelfmark
        </h1>
        <div className="w-16 h-[2px] bg-[#C9A227] mb-6" />
        <p className="text-[#5A4A3A] mb-4 leading-relaxed">
          Shelfmark is a community library management platform that connects
          borrowers with a curated collection of books. What started as a
          simple card-catalog system has grown into a full online library
          experience — one where every borrower gets a digital library card,
          every book gets tracked from shelf to hand and back again, and every
          reader's voice becomes part of the collection's story.
        </p>
        <p className="text-[#5A4A3A] mb-4 leading-relaxed">
          Members register, get approved by our librarian team, and can then
          borrow, renew, and return books online. Our goal is to keep the warmth
          and personal touch of a neighborhood library while making the process
          of finding, requesting, and managing books as smooth as possible.
        </p>
        <p className="text-[#5A4A3A] leading-relaxed">
          Our mission is to make reading accessible and organized for everyone
          in the community — one library card at a time.
        </p>
      </div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-[#FDF8EE] border-2 border-[#1B4F82] rounded-md p-6">
          <h3 className="font-serif font-bold text-[#1B2A3A] text-lg mb-2">Our Values</h3>
          <ul className="text-sm text-[#5A4A3A] space-y-2 list-disc list-inside">
            <li>Open access to every approved member</li>
            <li>Honest, timely record-keeping of loans</li>
            <li>A community shaped by shared feedback</li>
          </ul>
        </div>
        <div className="bg-[#FDF8EE] border-2 border-[#1B4F82] rounded-md p-6">
          <h3 className="font-serif font-bold text-[#1B2A3A] text-lg mb-2">How We Help</h3>
          <ul className="text-sm text-[#5A4A3A] space-y-2 list-disc list-inside">
            <li>Librarians review every new registration</li>
            <li>Automatic due dates and renewal reminders</li>
            <li>A public space to see what others are reading</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
