import React, {  useState } from "react";
import { OptionTypes } from "@/common/types";
import Dropdown from "@/components/dropdown/Dropdown";
import GameSection from "@/components/gameSection/GameSection";

const Home = () => {
  const [minesCount, setMinesCount] = useState<number>(1);
  const [start, setStart] = useState<boolean>(false);
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);

  const options: OptionTypes[] = Array.from({ length: 24 }, (_, index) => {
    return {
      value: index + 1,
      label: String(index + 1),
    };
  });

  const onSelect = (value: number | string) => {
    console.log("value", value);
    setMinesCount(+value);
  };

  return (
    <>
      <span className="absolute text-white text-4xl">MINES</span>
      <div className="flex justify-center items-center h-screen  bg-[#0a1126]">
        <div className="bg-[#111d41] grid grid-cols-3  w-3/4">
          <div className="h-full bg-[#020213] col-span-1 p-4 flex flex-col gap-4">
            <Dropdown options={options} onSelect={onSelect} start={start} />
            <button
              className="border-none outline-none bg-green-500 text-white p-2 rounded disabled:opacity-50"
              disabled={start}
              onClick={() => {
                setStart(true);
                setSelectedTiles([]);
              }}
            >
              Start
            </button>
          </div>
          <div className="col-span-2 relative flex justify-center items-center">
            <div
              className={`h-full w-full bg-black/60 absolute z-10 text-white flex justify-center items-center text-3xl ${
                start ? "hidden" : ""
              }`}
            >
              <span>Press start to continue</span>
            </div>
            <GameSection
              selectedTiles={selectedTiles}
              setSelectedTiles={setSelectedTiles}
              minesCount={minesCount}
              start={start}
              setStart={setStart}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
