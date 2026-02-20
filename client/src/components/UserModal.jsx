import { Check, X } from "lucide-react";

const UserModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center 
    p-4 z-50"
    >
      <div
        className="bg-gray-900 rouded-lg shadow-2xl max-w-2xl w-full max-h-screen
      overflow-y-auto border border-gray-800 rounded-lg"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-white">Add new user</h2>
          <button
            className="text-gray-400 hover:text-white transition-all cursor-pointer"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Name *
              </label>
              <input
                type="text"
                placeholder="John Smith"
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white
                placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              ></input>
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white
                placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              ></input>
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Phone *
              </label>
              <input
                type="tel"
                placeholder="+1234567890"
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white
                placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              ></input>
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Status *
              </label>
              <select
                className="w-full px-4 py-2.5 bg-gray-800 border-gray-700 text-white rounded-lg
              focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
              >
                <option>Active</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 text-gray-300
            rounded-lg hover:bg-gray-700 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              className="flex-1 flex items-center justify-center px-4 py-2.5 border border-gray-700 
              bg-green-500 text-gray-900 rounded-lg hover:bg-green-400 transition-all cursor-pointer"
            >
              <Check size={20} />
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
