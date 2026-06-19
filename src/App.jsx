import { useState } from "react";
import BillForm from "./components/BillForm";
import PeopleList from "./components/PeopleList";
import SplitResult from "./components/SplitResult";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [billAmount, setBillAmount] = useState("");
  const [people, setPeople] = useState([]);
  const [splitType, setSplitType] = useState("equal");
  const [result, setResult] = useState(null);

  const addPerson = (name) => {
    if (!name.trim()) return;
    setPeople([...people, { id: Date.now(), name, customAmount: "" }]);
  };

  const removePerson = (id) => {
    setPeople(people.filter((p) => p.id !== id));
  };

  const updateCustomAmount = (id, amount) => {
    setPeople(people.map((p) => (p.id === id ? { ...p, customAmount: amount } : p)));
  };

  const calculateSplit = () => {
    if (!billAmount || people.length === 0) return;
    const total = Number(billAmount);

    if (splitType === "equal") {
      const perPerson = (total / people.length).toFixed(2);
      setResult(people.map((p) => ({ name: p.name, amount: perPerson })));
    } else {
      const customTotal = people.reduce((sum, p) => sum + Number(p.customAmount || 0), 0);
      setResult(
        people.map((p) => ({
          name: p.name,
          amount: Number(p.customAmount || 0).toFixed(2),
        }))
      );
      setResult((prev) => [
        ...prev,
        { name: "Remaining (unassigned)", amount: (total - customTotal).toFixed(2) },
      ]);
    }
  };

  return (
    <div className="app">
      <h1>💸 Split Bill Calculator</h1>
      <BillForm
        billAmount={billAmount}
        setBillAmount={setBillAmount}
        splitType={splitType}
        setSplitType={setSplitType}
        addPerson={addPerson}
      />
      <PeopleList
        people={people}
        removePerson={removePerson}
        splitType={splitType}
        updateCustomAmount={updateCustomAmount}
      />
      {people.length > 0 && billAmount && (
        <button className="calc-btn" onClick={calculateSplit}>
          Calculate Split
        </button>
      )}
      {result && <SplitResult result={result} />}
      <Footer />
    </div>
  );
}

export default App;