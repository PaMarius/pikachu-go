import { Rule } from "./Rule";
import "./rules-and-guidelines.css";

export const RulesAndGuidelines = ({ onClick }) => {
  return (
    <div className="modal">
      <div className="white-container">
        <img src={"./x.svg"} className="x" onClick={onClick} />
        <p className="title">Rules and Guidelines</p>
        <div className="rules">
          <Rule
            text="When you click the START GAME button, you will be presented 2
              pokemon cards"
          />
          <Rule
            text="At the bottom of the screen, you will see 3 different buttons:
            WIN, LOSE and DRAW"
          />
          <Rule
            text="By clicking one of the buttons, you decide if the pokemon on the
            LEFT side of the screen will win or lose against the pokemon on the
            RIGHT"
          />

          <Rule text="You will have to play at least 3 matches in order to be able to end the game" />

          <Rule text="When the game ends, you will get a little suprise that might change your score for the better!" />

          <Rule text="Here you can see the type chart and the efficacy of a move type on a Pokémon's type:" />
        </div>
        <img id="pokemon-chart" src="pokemon-chart.png" />
        <p className="title">good luck and have fun!</p>
      </div>
    </div>
  );
};
