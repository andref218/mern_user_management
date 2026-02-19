import { Search } from "lucide-react";
import React from "react";

const SearchBar = () => {
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
          className="flex-1 text-white pl-2 py-2.5 bg-gray-800
        placeholder-gray-500 outline-none border-none px-3 truncate"
          placeholder="Search by name, email, phone or status..."
        />
      </div>
      {/*Rows per page & info */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400 whitespace-nowrap">
          Showing 1 to 5 of 10 Users
        </span>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">Rows</label>
          <select
            className="px-3 py-1.5 bg-gray-800 border border-gray-700
          text-white rounded-lg focus:ring-2 focus:ring-green-500 
          focus:border-green-500 outline-none text-sm"
          >
            <option>5</option>
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
