export const Rule = ({ text }) => {
  return (
    <div className="rule">
      <img src="pokeball.svg" className="pokeball" />
      <p>{text}</p>
    </div>
  );
};
