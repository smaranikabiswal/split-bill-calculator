function PeopleList({ people, removePerson, splitType, updateCustomAmount }) {
  if (people.length === 0) return null;

  return (
    <div className="people-list">
      <h3>People ({people.length})</h3>
      {people.map((person) => (
        <div className="person-row" key={person.id}>
          <span>{person.name}</span>
          {splitType === "custom" && (
            <input
              type="number"
              placeholder="Amount ₹"
              value={person.customAmount}
              onChange={(e) => updateCustomAmount(person.id, e.target.value)}
            />
          )}
          <button className="remove-btn" onClick={() => removePerson(person.id)}>
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

export default PeopleList;