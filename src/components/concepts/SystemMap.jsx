export default function SystemMap({
  study,
  compact = false
}) {
  const points = [[84, 206], [232, 109], [385, 206], [538, 109], [685, 206]];
  return <svg className={`system-map ${compact ? 'compact' : ''}`} viewBox="0 0 770 380" role="img" aria-label={`${study.name} proposed architecture: ${study.nodes.join(' to ')}`}>
<defs>
<pattern id={`grid-${study.id}-${compact}`} width="28" height="28" patternUnits="userSpaceOnUse">
<circle cx="1" cy="1" r="1" fill="currentColor" opacity=".18" />
</pattern>
</defs>
<rect width="770" height="380" fill={`url(#grid-${study.id}-${compact})`} />
<g className="map-guides" fill="none" stroke="currentColor" opacity=".13">
<ellipse cx="385" cy="190" rx="270" ry="134" />
<path d="M30 206H740 M385 20V350" />
<circle cx="385" cy="190" r="93" />
</g>
<path className="map-path" d="M84 206 L232 109 L385 206 L538 109 L685 206" fill="none" stroke="currentColor" strokeWidth="2" />
<path d="M685 222V306H84V222" fill="none" stroke="currentColor" strokeDasharray="4 7" opacity=".35" />
<text x="385" y="334" textAnchor="middle" className="map-note">OBSERVE / LEARN / ITERATE</text>
{points.map(([x, y], index) => <g key={study.nodes[index]}>
<circle cx={x} cy={y} r={index === 2 ? 35 : 23} className={index === 2 ? 'map-core' : 'map-node'} />
{index === 2 && <circle cx={x} cy={y} r="44" fill="none" stroke="currentColor" opacity=".4" />}
<text x={x} y={y + 4} textAnchor="middle" className="map-number">0{index + 1}</text>
<text x={x} y={y + (index === 2 ? 65 : 48)} textAnchor="middle" className="map-label">
{study.nodes[index]}
</text>
</g>)}
<text x="20" y="28" className="map-note">FIG. {study.number} / SYSTEM TOPOLOGY</text>
<text x="750" y="363" textAnchor="end" className="map-note">CONCEPTUAL MODEL</text>
</svg>;
}
