const API_URL = import.meta.env.VITE_API_URL + "/users";

//Get users
export const getUsers = async (page = 1, limit = 5) => {
  const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

//Search Users
export const searchUsers = async (term = "", page = 1, limit = 5) => {
  const res = await fetch(
    `${API_URL}/search/${encodeURIComponent(term)}?page=${page}&limit=${limit}`,
  );
  if (!res.ok) throw new Error("Failed to search users");
  return res.json();
};

//Get User status
export const getStats = async () => {
  const res = await fetch(`${API_URL}/status`);
  if (!res.ok) throw new Error("Failed to get stats");
  return res.json();
};

//Add a new user
export const addUser = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add user");
  return res.json();
};

//Update existing user
export const updateUser = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed update user");
  return res.json();
};

//Delete user
export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
};
