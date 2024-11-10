import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateProfile from "./update_profile";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/allUsers");
      console.log("response", response)
      setUsers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle select user for editing
  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  // Handle close update profile modal
  const handleCloseUpdateProfile = () => {
    setSelectedUser(null);
    fetchUsers(); // Refresh user list after update
  };

  return (
    <div className="container" style={{ padding: "25px" }}>
      <h3>All Users</h3>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Email</th>
              <th>mobile</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user._id}</td>
                <td>{user.first_name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedUser && (
        <UpdateProfile user={selectedUser} onClose={handleCloseUpdateProfile} />
      )}
    </div>
  );
};

export default AllUsers;
