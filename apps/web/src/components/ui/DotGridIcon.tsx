interface DotGridIconProps {
  className?: string;
}

export default function DotGridIcon({ className }: DotGridIconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <rect x="2" y="2" width="6.5" height="6.5" rx="1.5" fill="currentColor" />
      <rect x="11.5" y="2" width="6.5" height="6.5" rx="1.5" fill="currentColor" />
      <rect x="2" y="11.5" width="6.5" height="6.5" rx="1.5" fill="currentColor" />
      <rect x="11.5" y="11.5" width="6.5" height="6.5" rx="1.5" fill="currentColor" />
    </svg>
  );
}
