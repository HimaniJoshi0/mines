import React from "react";
import { OptionTypes } from "@/common/types";

interface DropdownTypes {
  options: OptionTypes[];
  onSelect: (value: string | number) => void;
  start: boolean;
}

const Dropdown = ({ options, onSelect, start }: DropdownTypes) => {
  const renderOptions = (item: OptionTypes, index: number) => {
    return (
      <option key={index} value={item.value}>
        {item.label}
      </option>
    );
  };

  const selectValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Selected value:", event.target.value);
    onSelect(event.target.value);
  };

  return (
    <div className="w-full">
      <p className="text-white">Mines</p>
      <select
        disabled={start}
        className="p-2 rounded bg-[#020213] border border-white text-white w-full disabled:opacity-60"
        onChange={selectValue}
      >
        {options.map(renderOptions)}
      </select>
    </div>
  );
};

export default Dropdown;
