import * as React from "react";
import { SearchInputProps } from "../types";

export const SearchInput: React.FC<SearchInputProps> = ({
  icon,
  placeholder,
  value,
  defaultValue,
}) => (
  <div className="flex flex-1 shrink gap-4 px-4 h-full basis-0 min-w-[240px] text-slate-500">
    <div className="flex shrink-0 my-auto w-6 h-6">{icon}</div>
    <div className="flex flex-col flex-1 shrink justify-between pt-5 basis-0">
      <input
        type="text"
        className="w-full bg-transparent border-none focus:outline-none"
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        aria-label={placeholder}
      />
      <div className="flex mt-2.5 w-full bg-zinc-200 min-h-[1px]" />
    </div>
  </div>
);
