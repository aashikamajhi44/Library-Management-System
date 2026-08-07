const Footer = () => {
  return (
    <footer className="bg-[#0F2A44] border-t-4 border-[#C9A227] text-[#8FA6BF] text-center py-6 mt-auto">
      <p className="font-serif text-[#F4D58D] text-sm mb-1">Shelfmark</p>
      <p className="text-xs">&copy; {new Date().getFullYear()} Shelfmark Library. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
