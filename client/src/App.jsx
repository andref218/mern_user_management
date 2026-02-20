import { Check, Plus, User, Users, X } from "lucide-react";
import StatsCard from "./components/StatsCard";
import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import {
  getUsers,
  searchUsers,
  getStats,
  addUser,
  updateUser,
  deleteUser,
} from "./api/userApi";
import { useEffect, useState } from "react";
import UserModal from "./components/UserModal";

function App() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [stats, setStats] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
  });
  const [recentlyEditedId, setRecentlyEditedId] = useState(false);

  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const status = ["Active", "Inactive"];

  useEffect(() => {
    fetchUsers();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (searchTerm) handleSearch();
    else fetchUsers();
  }, [searchTerm]);

  //Fetch stats
  const fetchStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } finally {
      setLoadingStats(false);
    }
  };

  //Fetch users
  const fetchUsers = async () => {
    try {
      const data = await getUsers(currentPage, itemsPerPage);
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setTotalUsers(data.totalUsers);
      await fetchStats();
    } finally {
      setLoadingUsers(false);
    }
  };

  //Handle search
  const handleSearch = async () => {
    setLoadingUsers(true);
    try {
      const data = await searchUsers(searchTerm, currentPage, itemsPerPage);
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setTotalUsers(data.totalUsers);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      if (editingItem) await updateUser(editingItem._id, values);
      else await addUser(values);
      closeModal();
      fetchUsers();
      if (editingItem?._id) {
        setRecentlyEditedId(editingItem._id);
        setTimeout(() => setRecentlyEditedId(null), 800);
      }
    } catch (error) {
      let msg = "An error occurred";
      if (error.response?.data?.message) msg = error.response.data.message;
      else if (error.message) msg = error.message;
      alert(msg);
    }
    setLoading(false);
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({ name: "", email: "", phone: "", status: "Active" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({ name: "", email: "", phone: "", status: "Active" });
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="bg-gray-900 shadow-xl border-b border-gray-800">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row 
          justify-between items-center gap-4"
        >
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto text-center sm:text-left">
            <div className="p-2 bg-blue-500/90 rounded-lg">
              <Users size={28} className="text-gray-900" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">User Management</h1>
              <p className="text-gray-400 mt-1">Manage and monitor all users</p>
            </div>
          </div>
          <button
            className="flex items-center justify-center gap-2 bg-blue-500/90 text-gray-900 px-5 py-2.5 rounded-lg
      hover:bg-blue-500 transition-colors shadow-lg font-semibold  sm:w-auto"
            onClick={() => openModal()}
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
          <StatsCard
            title="Total Users"
            loading={loadingStats}
            value={{ number: stats.total }}
            icon={<Users />}
            bgIcon="bg-indigo-500"
            iconColor="text-white"
            gradient="from-indigo-900 to-indigo-700"
          />
          <StatsCard
            title="Active Users"
            loading={loadingStats}
            value={{ number: stats.active }}
            icon={<Check />}
            bgIcon="bg-green-500"
            iconColor="text-white"
            gradient="from-green-900 to-green-700"
          />
          <StatsCard
            title="Inactive Users"
            loading={loadingStats}
            value={{ number: stats.inactive }}
            icon={<X />}
            bgIcon="bg-red-500"
            iconColor="text-white"
            gradient="from-red-900 to-red-700"
          />
        </div>
        {/* Search */}
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={() => {
            setSearchTerm("");
            setCurrentPage(1);
          }}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={(val) => {
            setItemsPerPage(val);
            setCurrentPage(1);
          }}
          currentPage={currentPage}
          totalUsers={totalUsers}
        />
        {/* User Table */}
        <UserTable
          users={users}
          loading={loadingUsers}
          onEdit={openModal}
          onDelete={handleDelete}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          recentlyEditedId={recentlyEditedId}
        />
        <UserModal
          isOpen={isModalOpen}
          onClose={closeModal}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          loading={loading}
          status={status}
        />
      </main>
    </div>
  );
}

export default App;
