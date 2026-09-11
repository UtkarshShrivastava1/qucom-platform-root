import Image from "next/image";
import Link from "next/link";

export default function Logo({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const isDarkTheme = theme === 'dark';
  
  return (
    <Link href="/" className="flex items-center gap-2 select-none hover:opacity-90 transition-opacity">
      <div className="relative h-[34px] w-[34px] shrink-0">
        <Image
          src="/logo_v.png"
          alt="Viztore"
          width={34}
          height={34}
          className="object-contain"
          priority
        />
      </div>

      <div className="flex flex-col justify-center leading-none">
        <span className={`text-[22px] font-bold tracking-tight font-sans ${isDarkTheme ? 'text-[#192168]' : 'text-white'}`}>
          viztore
        </span>
        <p className={`text-[8.5px] font-medium tracking-tight mt-0.5 ${isDarkTheme ? 'text-[#192168]/80' : 'text-white/90'}`}>
          Making Local Stores Visible.
        </p>
      </div>
    </Link>
  );
}
