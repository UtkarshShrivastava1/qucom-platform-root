import { MapPin, ChevronDown } from "lucide-react";

interface LocationBarProps {
  name?: string;
  address?: string;
}

export default function LocationBar({
  name = "Harish Kumar",
  address = "Q No- 6/B, Street -13, Sector -2, Bhilai",
}: LocationBarProps) {
  return (
    <div className="px-4 mb-3.5">
      <button
        type="button"
        className="w-full flex items-center gap-2.5 rounded-full bg-[#021d5c]/60 hover:bg-[#021d5c]/80 transition-colors border border-white/10 px-4 py-2.5 text-left backdrop-blur-md shadow-sm"
      >
        <MapPin
          className="h-4 w-4 shrink-0 text-[#4C82FB]"
          fill="#4C82FB"
          strokeWidth={0}
        />
        <span className="flex-1 truncate text-[12px] text-white">
          <span className="font-normal">Deliver to </span>
          <span className="font-medium">{name}</span>
          <span className="text-white/90"> - {address}</span>
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-white" strokeWidth={2.2} />
      </button>
    </div>
  );
}
