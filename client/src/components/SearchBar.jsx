import { Search } from "lucide-react";
import React from "react";

const SearchBar = ({
  value,
  onChange,
  onClear,
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  totalUsers,
}) => {
  const startUser = totalUsers === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endUser = Math.min(currentPage * itemsPerPage, totalUsers);
  return (
    <div
      className="bg-gray-900 rounded-lg shadow-lg p-4 border border-gray-800 flex
  flex-col md:flex-row md:items-center md:justify-between gap-4"
    >
      {/*Search Input*/}
      <div
        className="flex items-center gap-2 w-full bg-gray-800 rounded-lg
        border border-gray-700 focus-within:ring-2 focus-within:ring-green-500
      focus-within:border-green-500"
      >
        <Search size={20} className="text-gray-400 pointer-events-none ml-3" />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 text-white pl-2 py-2.5 bg-gray-800
        placeholder-gray-500 outline-none border-none px-3 truncate"
          placeholder="Search by name, email, phone or status..."
        />
      </div>
      {/*Rows per page & info */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400 whitespace-nowrap">
          Showing {startUser} to {endUser} of {totalUsers} Users
        </span>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">Rows</label>
          <select
            className="px-3 py-1.5 bg-gray-800 border border-gray-700
          text-white rounded-lg focus:ring-2 focus:ring-green-500 
          focus:border-green-500 outline-none text-sm"
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
