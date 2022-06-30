export default function Tile({ char, validity }) {
  return <div className={`tile ${validity}`}>{char}</div>;
}
