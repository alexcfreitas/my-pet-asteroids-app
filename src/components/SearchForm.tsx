import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SearchFormProps {
  onSearch: (startDate: string, endDate: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate && endDate) {
      onSearch(formatDate(startDate), formatDate(endDate));
    }
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date) {
      const maxEndDate = new Date(date);
      maxEndDate.setDate(maxEndDate.getDate() + 7);
      setEndDate(maxEndDate);
    } else {
      setEndDate(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center space-x-4"
    >
      <DatePicker
        id="startDateDatePicker"
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate || undefined}
        endDate={endDate || undefined}
        placeholderText="Start Date"
        className="p-2 border rounded w-40 text-center"
        required
      />
      <DatePicker
        id="endDateDatePicker"
        selected={endDate}
        onChange={(date: Date | null) => setEndDate(date)}
        selectsEnd
        startDate={startDate || undefined}
        endDate={endDate || undefined}
        minDate={startDate || undefined}
        maxDate={
          startDate
            ? new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000)
            : undefined
        }
        placeholderText="End Date"
        className="p-2 border rounded w-40 text-center"
        required
        disabled={!startDate}
      />
      <button
        id="submitButton"
        type="submit"
        className="bg-[#f84531] text-white p-2 rounded hover:bg-[#d63a2a] transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchForm;
