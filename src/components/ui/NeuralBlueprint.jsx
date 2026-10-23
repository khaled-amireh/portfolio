// Static decorative SVG, without a canvas, animation loop, or image download.
const nodes = [[90, 150], [90, 230], [90, 310], [200, 100], [200, 180], [200, 260], [200, 340], [310, 150], [310, 230], [310, 310]]
const edges = [[0, 3], [0, 4], [0, 5], [1, 3], [1, 4], [1, 5], [1, 6], [2, 4], [2, 5], [2, 6], [3, 7], [3, 8], [4, 7], [4, 8], [4, 9], [5, 7], [5, 8], [5, 9], [6, 8], [6, 9]]
export default function NeuralBlueprint() {
  return <div className="blueprint" aria-hidden="true"><svg viewBox="0 0 440 440" fill="none">
    <circle cx="220" cy="220" r="185" stroke="#1D5966" strokeOpacity="0.4" strokeDasharray="2 8" />
    <circle cx="220" cy="220" r="150" stroke="#1D5966" strokeOpacity="0.3" />
    {edges.map(([a, b]) => <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#54D6CB" strokeOpacity="0.16" strokeWidth="0.8" />)}
    {nodes.map(([x, y], index) => <g key={index}><circle cx={x} cy={y} r="10" fill="#0B1D27" stroke="#1D5966" /><circle cx={x} cy={y} r="2.5" fill={index === 4 || index === 8 ? '#C3F3E7' : '#54D6CB'} fillOpacity="0.8" /></g>)}
    <path d="M35 220h12m-6-6v12m352-6h12m-6-6v12M220 29v12m-6-6h12m-6 364v12m-6-6h12" stroke="#54D6CB" strokeOpacity="0.6" />
  </svg></div>
}
