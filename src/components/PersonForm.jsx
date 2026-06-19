import { useState } from "react";

function PersonForm({ onAdd }) {
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd(name);
    setName("");
  };

  return (
    <div className="card">
      <h2>Add People</h2>
      <div className="add-row">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Enter name"
        />
        <button className="primary-btn small" onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

export default PersonForm;