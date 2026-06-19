function PeopleList({ people, onRemove }) {
  return (
    <div className="card">
      <h2>People ({people.length})</h2>
      {people.length === 0 ? (
        <p className="hint">No one added yet. Add names above.</p>
      ) : (
        <ul className="people-list">
          {people.map((p) => (
            <li key={p.id} className="person-row">
              <span className="person-name">{p.name}</span>
              <button className="remove-btn" onClick={() => onRemove(p.id)} aria-label={`Remove ${p.name}`}>✕</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PeopleList;