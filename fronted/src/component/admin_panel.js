import React, { useState } from "react";
import AddProperty from "./AddProperty";
import UpdateProperty from "./UpdateProperty";

const AdminPanel = () => {
  const [view, setView] = useState("add");

  return (
    <div className="container mt-3">
      <h2>Admin Panel</h2>
      <div className="btn-group mb-3">
        <button onClick={() => setView("add")} className="btn btn-primary">Add Property</button>
        <button onClick={() => setView("update")} className="btn btn-secondary">Update Property</button>
      </div>
      {view === "add" ? <AddProperty /> : <UpdateProperty />}
    </div>
  );
};

export default AdminPanel;
