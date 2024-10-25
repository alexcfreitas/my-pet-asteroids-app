import React from "react";

interface SortButtonProps {
  onSort: () => void;
  label: string;
}

const SortButton: React.FC<SortButtonProps> = ({ onSort, label }) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      onSort();
    }
  };

  return (
    <button
      onClick={onSort}
      onKeyDown={handleKeyDown}
      className="mb-6 bg-[#f84531] text-white px-4 py-2 rounded hover:bg-[#d63a2a] transition duration-300"
      aria-label={`Sort ${label}`}
      tabIndex={0}
    >
      Sort by {label}
    </button>
  );
};

export default SortButton;
