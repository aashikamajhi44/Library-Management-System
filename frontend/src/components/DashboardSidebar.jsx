const DashboardSidebar = ({ title, subtitle, items, active, onSelect }) => {
  return (
    <aside className="w-full md:w-64 bg-[#0F2A44] border-r-4 border-[#C9A227] md:min-h-[calc(100vh-140px)] px-4 py-6">
      <div className="mb-8 px-2">
        <p className="text-[#C9A227] text-xs uppercase tracking-widest mb-1">{subtitle}</p>
        <h2 className="text-xl font-serif font-bold text-[#F4D58D]">{title}</h2>
      </div>
      <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className={`text-left px-4 py-2.5 rounded font-serif text-sm whitespace-nowrap transition-colors ${
              active === item.key
                ? "bg-[#F4D58D] text-[#0F2A44] font-semibold"
                : "text-[#8FA6BF] hover:bg-[#16385a] hover:text-[#F4D58D]"
            }`}
          >
            {item.label}
            {item.count !== undefined && (
              <span
                className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                  active === item.key ? "bg-[#0F2A44] text-[#F4D58D]" : "bg-[#1B4F82] text-[#F4D58D]"
                }`}
              >
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
