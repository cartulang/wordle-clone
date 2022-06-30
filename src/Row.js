import Tile from "./Tile";

const WORD_LENGTH = 5;
export default function Row({ guess, word, isFinal }) {
  const tiles = [];
  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i];
    let validity = "";

    if (isFinal) {
      if (char === word[i]) {
        validity = "correct";
      } else if (word.includes(char)) {
        validity = "valid";
      } else {
        validity = "invalid";
      }
    }

    tiles.push(<Tile key={i} char={char} validity={validity} />);
  }

  return (
    <div className="row">
      {tiles.map((tile) => {
        return tile;
      })}
    </div>
  );
}
