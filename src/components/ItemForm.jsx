import { useState } from "react";

function ItemForm({ people, items, onAdd, onRemove }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [sharedBy, setSharedBy] = useState([]);

  const togglePerson = (id) => {
    setSharedBy((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    onAdd(name, price, sharedBy);
    setName("");
    setPrice("");
    setSharedBy([]);
  };

  if (people.length === 0) {
    return (
      <div className="card">
        <h2>Items</h2>
        <p className="hint">Add at least one person before adding items.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Items</h2>

      <div className="two-col">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Item name e.g. Pizza" />
        <input type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price ₹" />
      </div>

      <p className="hint">Who shared this item?</p>
      <div className="checkbox-group">
        {people.map((p) => (
          <label key={p.id} className="checkbox-pill">
            <input
              type="checkbox"
              checked={sharedBy.includes(p.id)}
              onChange={() => togglePerson(p.id)}
            />
            {p.name}
          </label>
        ))}
      </div>

      <button className="primary-btn small" onClick={handleAdd} disabled={!name.trim() || !price || sharedBy.length === 0}>
        Add Item
      </button>

      {items.length > 0 && (
        <ul className="item-list">
          {items.map((it) => (
            <li key={it.id} className="item-row">
              <div>
                <strong>{it.name}</strong> — ₹{it.price.toFixed(2)}
                <div className="item-shared-by">
                  Shared by: {it.sharedBy.map((id) => people.find((p) => p.id === id)?.name).filter(Boolean).join(", ")}
                </div>
              </div>
              <button className="remove-btn" onClick={() => onRemove(it.id)} aria-label={`Remove ${it.name}`}>✕</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemForm;