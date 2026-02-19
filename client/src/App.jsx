import { Plus, Users } from "lucide-react";
import StatsCard from "./components/StatsCard";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="bg-gray-900 shadow-xl border-b border-gray-800 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <Users size={28} className="text-gray-900" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">User Management</h1>
              <p className="text-gray-400 mt-1">Mern Stack Application</p>
            </div>
          </div>
          <button
            className="flex items-center gap-2 bg-green-500 text-gray-900 px-5 py-2.5 rounded-lg
          hover:bg-green-400 transition-colors shadow-lg font-semibold"
          >
            <Plus size={20} />
            <span className="text-sm">Add user</span>
          </button>
        </div>
      </div>
      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/*Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard />
        </div>
        {/* Search */}
        <SearchBar />
      </main>
    </div>
  );
}

export default App;
