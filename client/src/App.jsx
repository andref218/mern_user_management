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
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active",
  });

  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
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
    const data = await getStats();
    setStats(data);
  };

  //Fetch users
  const fetchUsers = async () => {
    const data = await getUsers(currentPage, itemsPerPage);
    setUsers(data.users);
    setTotalPages(data.totalPages);
    setTotalUsers(data.totalUsers);
    fetchStats();
  };

  //Handle search
  const handleSearch = async () => {
    const data = await searchUsers(searchTerm, currentPage, itemsPerPage);
    setUsers(data.users);
    setTotalPages(data.totalPages);
    setTotalUsers(data.totalUsers);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || formData.phone)
      return alert("Fill all the fields");
    setLoading(true);
    try {
      if (editingItem) await updateUser(editingItem._id, formData);
      else await addUser(formData);
      closeModal();
      fetchUsers();
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
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
            value={{ number: stats.total }}
            icon={<Users />}
            bgIcon="bg-indigo-500"
            iconColor="text-white"
            gradient="from-indigo-900 to-indigo-700"
          />
          <StatsCard
            title="Active Users"
            value={{ number: stats.active }}
            icon={<Check />}
            bgIcon="bg-green-500"
            iconColor="text-white"
            gradient="from-green-900 to-green-700"
          />
          <StatsCard
            title="Inactive Users"
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
          onEdit={openModal}
          onDelete={handleDelete}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        <UserModal isOpen={isModalOpen} onClose={closeModal} />
      </main>
    </div>
  );
}

export default App;
