export default function SearchBar() {
  return (
    <label className="premium-card flex h-10 items-center gap-2 rounded-xl border border-[#E7D3D6] bg-white px-3 text-[#8A1238]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        placeholder="Search"
        className="w-32 bg-transparent text-sm text-[#5A001F] outline-none placeholder:text-[#9B6A79]"
        aria-label="Search"
      />
    </label>
  );
}
