import { useState } from "react";
import "./assets/styles/index.scss";
import { Tictactoe } from "./components/Tictactoe";

export const App = () => {
  const [game, setGame] = useState(false);
  const [span1Class, setSpan1Class] = useState("");
  const [span2Class, setSpan2Class] = useState("");
  const [span3Class, setSpan3Class] = useState("");

  const showGame = () => {
    return (
      <h1>
        <span
          className={span1Class}
          onClick={disappear}
          onAnimationEnd={launchGame}
        >
          Tic
        </span>
        <span className={span2Class} onClick={disappear}>
          Tac
        </span>
        <span className={span3Class} onClick={disappear}>
          Toe
        </span>
      </h1>
    );
  };

  const disappear = () => {
    setSpan3Class("disappear");
    setTimeout(() => setSpan2Class("disappear"), 100);
    setTimeout(() => setSpan1Class("disappear"), 200);
  };

  const launchGame = () => {
    setGame(true);
  };

  return <div className="App">{game ? <Tictactoe /> : showGame()}</div>;
};

/* <Show when={Boolean(game)} fallback={showGame()}>
<Tictactoe />
</Show>

export function Show({
  when,
  children,
  fallback,
}: {
  children: ReactNode;
  when: boolean;
  fallback?: ReactNode;
}): ReactElement | null {
  return when ? (children as ReactElement) : (fallback as any) || null;
} */

// type blabla = Array<Array<string | boolean>>;
// type blablaNul = string[]; // à éviter (car complexe quand il y a plusieurs niveaux de tableau)

// const a: blabla = [["Salut", "bonsoir", "youpi"]]; // Type blabla TRUE
// const x: blabla = [["salut", true]]; // Type blabla FALSE
