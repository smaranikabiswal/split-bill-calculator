import { useState } from "react";

function BillForm({ billAmount, setBillAmount, splitType, setSplitType, addPerson }) {
  const [name, setName] = useState("");

  const handleAdd = () => {
    addPerson(name);
    setName("");
  };

  return (
    <div className="bill-form">
      <div className="field">
        <label>Total Bill Amount (₹)</label>
        <input
          type="number"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          placeholder="e.g. 1200"
        />
      </div>

      <div className="field">
        <label>Split Type</label>
        <select value={splitType} onChange={(e) => setSplitType(e.target.value)}>
          <option value="equal">Equal Split</option>
          <option value="custom">Custom Split</option>
        </select>
      </div>

      <div className="field add-person">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter person's name"
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button onClick={handleAdd}>Add Person</button>
      </div>
    </div>
  );
}

export default BillForm;