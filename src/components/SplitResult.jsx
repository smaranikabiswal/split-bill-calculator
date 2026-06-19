function SplitResult({ people, items, billTotal, taxPercent, tipPercent, splitMode }) {
  const itemsSubtotal = items.reduce((sum, it) => sum + it.price, 0);
  const subtotal = splitMode === "equal" ? billTotal : itemsSubtotal;
  const taxAmount = (subtotal * taxPercent) / 100;
  const tipAmount = (subtotal * tipPercent) / 100;
  const grandTotal = subtotal + taxAmount + tipAmount;

  let shares;
  if (splitMode === "equal") {
    const perPerson = grandTotal / people.length;
    shares = people.map((p) => ({ name: p.name, amount: perPerson }));
  } else {
    // Each person's raw share = sum over items they're part of (price / sharers count)
    const rawShares = people.map((p) => {
      const raw = items.reduce((sum, it) => {
        if (it.sharedBy.includes(p.id)) {
          return sum + it.price / it.sharedBy.length;
        }
        return sum;
      }, 0);
      return { id: p.id, name: p.name, raw };
    });

    shares = rawShares.map((s) => {
      const fraction = subtotal > 0 ? s.raw / subtotal : 0;
      return { name: s.name, amount: fraction * grandTotal };
    });
  }

  return (
    <div className="card result-card">
      <h2>Result</h2>
      <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
      <div className="summary-row"><span>Tax ({taxPercent}%)</span><span>₹{taxAmount.toFixed(2)}</span></div>
      <div className="summary-row"><span>Tip ({tipPercent}%)</span><span>₹{tipAmount.toFixed(2)}</span></div>
      <div className="summary-row total"><span>Grand Total</span><span>₹{grandTotal.toFixed(2)}</span></div>

      <h3>Each Person Pays</h3>
      <ul className="result-list">
        {shares.map((s, i) => (
          <li key={i} className="result-row">
            <span>{s.name}</span>
            <span>₹{s.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SplitResult;