export default function SectionMarker({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="section-marker">
      <span className="section-marker-num">/ {number}</span>
      <span className="section-marker-label">{label}</span>
    </div>
  );
}
