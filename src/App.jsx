import { useState } from "react";
import BillForm from "./components/BillForm";
import PeopleList from "./components/PeopleList";
import PersonForm from "./components/PersonForm";
import ItemForm from "./components/ItemForm";
import SplitResult from "./components/SplitResult";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [people, setPeople] = useState([]);
  const [items, setItems] = useState([]); // {id, name, price, sharedBy:[personIds]}
  const [billTotal, setBillTotal] = useState("");
  const [taxPercent, setTaxPercent] = useState("");
  const [tipPercent, setTipPercent] = useState("");
  const [splitMode, setSplitMode] = useState("equal"); // "equal" | "itemized"
  const [showResult, setShowResult] = useState(false);

  const addPerson = (name) => {
    if (!name.trim()) return;
    setPeople([...people, { id: Date.now(), name: name.trim() }]);
  };

  const removePerson = (id) => {
    setPeople(people.filter((p) => p.id !== id));
    setItems(items.map((it) => ({ ...it, sharedBy: it.sharedBy.filter((pid) => pid !== id) })));
    setShowResult(false);
  };

  const addItem = (name, price, sharedBy) => {
    if (!name.trim() || !price || sharedBy.length === 0) return;
    setItems([...items, { id: Date.now(), name: name.trim(), price: parseFloat(price), sharedBy }]);
    setShowResult(false);
  };

  const removeItem = (id) => {
    setItems(items.filter((it) => it.id !== id));
    setShowResult(false);
  };

  const calculateSplit = () => setShowResult(true);

  const reset = () => {
    setPeople([]);
    setItems([]);
    setBillTotal("");
    setTaxPercent("");
    setTipPercent("");
    setSplitMode("equal");
    setShowResult(false);
  };

  const canCalculate =
    people.length > 0 &&
    (splitMode === "equal" ? parseFloat(billTotal) > 0 : items.length > 0);

  return (
    <div className="app-container">
      <h1>Split Bill Calculator</h1>
      <p className="subtitle">Split your bill fairly — equally or by shared items</p>

      <div className="card mode-switch">
        <h2>Split Mode</h2>
        <div className="toggle-group">
          <button
            className={splitMode === "equal" ? "toggle-btn active" : "toggle-btn"}
            onClick={() => { setSplitMode("equal"); setShowResult(false); }}
          >
            Equal Split
          </button>
          <button
            className={splitMode === "itemized" ? "toggle-btn active" : "toggle-btn"}
            onClick={() => { setSplitMode("itemized"); setShowResult(false); }}
          >
            Itemized Split (Shared Items)
          </button>
        </div>
      </div>

      <BillForm
        billTotal={billTotal}
        setBillTotal={setBillTotal}
        taxPercent={taxPercent}
        setTaxPercent={setTaxPercent}
        tipPercent={tipPercent}
        setTipPercent={setTipPercent}
        splitMode={splitMode}
      />

      <PersonForm onAdd={addPerson} />

      <PeopleList people={people} onRemove={removePerson} />

      {splitMode === "itemized" && (
        <ItemForm people={people} items={items} onAdd={addItem} onRemove={removeItem} />
      )}

      <div className="action-buttons">
        <button className="primary-btn" onClick={calculateSplit} disabled={!canCalculate}>
          Calculate Split
        </button>
        <button className="secondary-btn" onClick={reset}>
          Reset
        </button>
      </div>

      {showResult && (
        <SplitResult
          people={people}
          items={items}
          billTotal={parseFloat(billTotal) || 0}
          taxPercent={parseFloat(taxPercent) || 0}
          tipPercent={parseFloat(tipPercent) || 0}
          splitMode={splitMode}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;