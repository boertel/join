export default function Venn({
  tableA,
  tableB,
  circles,
  toggle,
  width = 600,
  height = 320,
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 700 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="cut">
          <rect x="285" y="0" width="140" height="400" />
        </clipPath>
        <mask id="eraser">
          <circle cx="488" cy="210" r={200 - 2} fill="#fff" />
        </mask>
      </defs>
      <circle
        cx="212"
        cy="210"
        r="200"
        fill="var(--red)"
        fillOpacity={circles[0] ? 0.7 : 0}
        stroke="var(--red)"
        strokeWidth="4"
        onClick={() => toggle(0)}
      />
      <text
        x="40"
        y="212"
        fill={circles[0] ? 'var(--black)' : 'var(--red)'}
        dominantBaseline="middle"
        style={{fontSize: '36px', pointerEvents: 'none'}}>
        Table {tableA}
      </text>
      <circle
        cx="488"
        cy="210"
        r="200"
        fill="var(--blue)"
        fillOpacity={circles[2] ? 0.7 : 0}
        stroke="var(--blue)"
        strokeWidth="4"
        onClick={() => toggle(2)}
      />
      <text
        x="540"
        y="212"
        fill={circles[2] ? 'var(--black)' : 'var(--blue)'}
        dominantBaseline="middle"
        style={{fontSize: '36px', pointerEvents: 'none'}}>
        Table {tableB}
      </text>
      <circle
        cx="212"
        cy="210"
        r={200 - 2}
        fill={circles[1] ? 'var(--overlay)' : 'var(--bg)'}
        fillOpacity={circles[1] ? 1 : 1}
        clipPath="url(#cut)"
        mask="url(#eraser)"
        onClick={() => toggle(1)}
      />
    </svg>
  );
}
