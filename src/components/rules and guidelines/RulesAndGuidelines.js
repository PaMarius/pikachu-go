import { Rule } from "./Rule";
import "./rules-and-guidelines.css";
import { rulesData } from "./rulesData";

export const RulesAndGuidelines = ({ onClick }) => {
  return (
    <div className="modal">
      <div className="white-container">
        <img src={"./x.svg"} className="x" onClick={onClick} />
        <p className="title">Rules and Guidelines</p>
        <div className="rules">
          {rulesData.map((rule) => {
            return <Rule text={rule.text} />;
          })}
        </div>
        <img id="pokemon-chart" src="pokemon-chart.png" />
        <p className="title">good luck and have fun!</p>
      </div>
    </div>
  );
};
