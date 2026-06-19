function BillForm({ billTotal, setBillTotal, taxPercent, setTaxPercent, tipPercent, setTipPercent, splitMode }) {
  return (
    <div className="card">
      <h2>Bill Details</h2>

      {splitMode === "equal" && (
        <label>
          Total Bill Amount (₹)
          <input
            type="number"
            min="0"
            value={billTotal}
            onChange={(e) => setBillTotal(e.target.value)}
            placeholder="e.g. 1200"
          />
        </label>
      )}

      {splitMode === "itemized" && (
        <p className="hint">
          Add items below and tag who shared each one. Tax &amp; tip apply proportionally to everyone's share.
        </p>
      )}

      <div className="two-col">
        <label>
          Tax (%)
          <input type="number" min="0" value={taxPercent} onChange={(e) => setTaxPercent(e.target.value)} placeholder="e.g. 5" />
        </label>
        <label>
          Tip (%)
          <input type="number" min="0" value={tipPercent} onChange={(e) => setTipPercent(e.target.value)} placeholder="e.g. 10" />
        </label>
      </div>
    </div>
  );
}

export default BillForm;