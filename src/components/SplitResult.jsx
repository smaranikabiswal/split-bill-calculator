function SplitResult({ result }) {
  return (
    <div className="result">
      <h2>Split Result</h2>
      {result.map((r, idx) => (
        <div className="result-row" key={idx}>
          <span>{r.name}</span>
          <strong>₹{r.amount}</strong>
        </div>
      ))}
    </div>
  );
}

export default SplitResult;