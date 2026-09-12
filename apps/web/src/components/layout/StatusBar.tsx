import React from "react";

export default function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-2 pb-1 text-white select-none">
      {/* Time */}
      <span className="text-[14px] font-semibold tracking-tight">9:41</span>

      {/* Status Icons */}
      <div className="flex items-center gap-1.5">
        {/* Cellular Signal Bars */}
        <svg
          className="w-4 h-3.5 fill-current"
          viewBox="0 0 17 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Cellular signal"
        >
          <rect x="0.5" y="8" width="2.5" height="4" rx="0.8" fill="white" />
          <rect x="4.5" y="5.5" width="2.5" height="6.5" rx="0.8" fill="white" />
          <rect x="8.5" y="3" width="2.5" height="9" rx="0.8" fill="white" />
          <rect x="12.5" y="0.5" width="2.5" height="11.5" rx="0.8" fill="white" />
        </svg>

        {/* Wi-Fi Icon */}
        <svg
          className="w-4 h-3.5 fill-current"
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Wi-Fi"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 10C8.69 10 9.25 10.56 9.25 11.25C9.25 11.66 8.69 12 8 12C7.31 12 6.75 11.66 6.75 11.25C6.75 10.56 7.31 10 8 10ZM8 6.5C9.8 6.5 11.4 7.2 12.6 8.3L13.7 7.2C12.2 5.8 10.2 5 8 5C5.8 5 3.8 5.8 2.3 7.2L3.4 8.3C4.6 7.2 6.2 6.5 8 6.5ZM8 2C11 2 13.7 3.2 15.6 5.1L16.7 4C14.5 1.8 11.4 0.5 8 0.5C4.6 0.5 1.5 1.8 -0.7 4L0.4 5.1C2.3 3.2 5 2 8 2Z"
            fill="white"
          />
        </svg>

        {/* Battery Icon */}
        <div className="flex items-center">
          <div className="w-[22px] h-[11px] rounded-[3.5px] border-[1.2px] border-white p-[1.5px] flex items-center">
            <div className="h-full w-[82%] bg-white rounded-[1.5px]" />
          </div>
          <div className="w-[1.5px] h-[4px] bg-white rounded-r-[1px] ml-[0.5px]" />
        </div>
      </div>
    </div>
  );
}
