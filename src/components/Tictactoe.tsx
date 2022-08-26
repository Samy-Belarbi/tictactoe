import React, { useState } from "react";

const INITIAL_GAME_STATE = Array(9).fill("");
const INITIAL_CELL_CLASSNAME = Array(9).fill("cell");
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const Tictactoe = () => {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
  const [cellClassName, setCellClassName] = useState(INITIAL_CELL_CLASSNAME);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");

  const play = (e: any) => {
    const cellIndex = e.target.getAttribute("data-cell-index");
    const currentValue = gameState[cellIndex];

    if (currentValue) return;

    const newGameState = [...gameState];
    const newCellClassName = [...cellClassName];

    newGameState[cellIndex] = currentPlayer;
    newCellClassName[cellIndex] = changeClassName();

    setGameState(newGameState);
    setCellClassName(newCellClassName);

    checkIfSomeoneWon(newGameState);
    changePlayer();
  };

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const changeClassName = () => {
    if (currentPlayer === "X") return "cell cross";

    return "cell circle";
  };

  const clearBoard = () => {
    setGameState(INITIAL_GAME_STATE);
    setCellClassName(INITIAL_CELL_CLASSNAME);
  };

  const checkIfSomeoneWon = (newGameState: Array<string>) => {
    let hasSomeoneWon = false;

    for (let i = 0; i < WINNING_COMBOS.length; i++) {
      const winCombo = WINNING_COMBOS[i];

      let a = newGameState[winCombo[0]];
      let b = newGameState[winCombo[1]];
      let c = newGameState[winCombo[2]];

      if ([a, b, c].includes("")) continue;

      if (a === b && b === c) {
        hasSomeoneWon = true;
        break;
      }
    }

    if (hasSomeoneWon) {
      clearBoard();
      setWinner(`${currentPlayer} a gagné !`);
      return;
    }

    if (!newGameState.includes("")) {
      clearBoard();
      setWinner("Egalité !");
      return;
    }
  };

  return (
    <div className="tictactoe-container">
      {winner ? <h2>{winner}</h2> : ""}
      <div className="tictactoe">
        {gameState.map((player, index) => (
          <Cell
            key={index}
            {...{ player, index, cellClassName }}
            onClick={(e) => play(e)}
          />
        ))}
      </div>
    </div>
  );
};

const Cell = ({ player, index, onClick, cellClassName }: CellProps) => {
  return (
    <div
      className={cellClassName[index]}
      data-cell-index={index}
      {...{ onClick }}
    >
      <span data-cell-index={index}>{player}</span>
    </div>
  );
};

type CellProps = {
  player?: string;
  cellClassName: Array<string>;
  onClick(e: React.MouseEvent): void;
  index: number;
};

// const Square = ({ onChange }: SquareProps) => {
//   return (
//     <input type="checkbox" onChange={(e) => onChange(e.target.checked)}>
//       salut
//     </input>
//   );
// };

// type SquareProps2 = { onChange: (state: boolean) => void } & CommonProps;
// interface SquareProps extends CommonProps {
//   onChange: (state: boolean) => void;
// }

// type CommonProps<T = boolean> = {
//   abc: string;
//   bbb?: string | number;
//   dynamic: T;
// };
// type StringOrNumber = string | number;

// const aaa: CommonProps<string> = {
//   abc: "salut",
//   bbb: undefined,
//   dynamic: "salut",
// };

// // Générique (genre <T>) c'est un paramètre qu'on passe au type / interface qui permet de rendre dynamique certaines parties de mon type

// type CarProps<T extends CarBrand = CarBrand> = { brand: T };

// type CarBrand = "Ferrari" | FrenchBrand;

// type FrenchBrand = "Renault" | "Random";

// const car: CarProps<FrenchBrand> = { brand: "" };
