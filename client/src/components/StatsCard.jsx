import { User } from "lucide-react";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const StatsCard = ({
  loading,
  title,
  value,
  icon,
  bgIcon = "bg-gray-700",
  iconColor = "text-white",
  gradient = "from-gray-900 to-gray-800",
  description = "",
}) => {
  return (
    <div
      className={`rounded-lg shadow-lg p-6 border bg-linear-to-r ${gradient} border-gray-800 transform hover:scale-105 
        transition-all bg-amber-200 ${gradient}`}
    >
      <div className="flex justify-between">
        <div>
          <p className="text-gray-300 text-sm font-medium">{title}</p>
          <p
            className="text-3xl font-bold mt-2"
            style={{ color: value.color || "white" }}
          >
            {loading ? <LoadingSpinner inline size={24} /> : value.number}
          </p>
          {description && (
            <p className="text-gray-400 text-sm mt-1">{description}</p>
          )}
        </div>
        {/* Icon*/}
        <div
          className={`p-3 rounded-lg flex items-center justify-center ${bgIcon}`}
        >
          {React.cloneElement(icon, { size: 22, className: iconColor })}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
