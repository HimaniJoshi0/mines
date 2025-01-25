import React, { useEffect, useState } from "react";
import { TileTypes } from "@/common/types";

interface GameSectionProps {
  minesCount: number;
  start: boolean;
  setStart: (value: boolean) => void;
  selectedTiles: number[];
  setSelectedTiles: (val: number[]) => void;
}

const GameSection = ({
  minesCount,
  start,
  setStart,
  selectedTiles,
  setSelectedTiles,
}: GameSectionProps) => {
  const [tiles, setTiles] = useState<TileTypes[]>(
    Array.from({ length: 25 }, (_, index) => {
      return {
        type: "mine",
      };
    })
  );

  useEffect(() => {
    if (start) {
      const mineArray: TileTypes[] = Array.from(
        { length: minesCount },
        (_, index) => {
          return {
            type: "mine",
          };
        }
      );

      const gemArray: TileTypes[] = Array.from(
        { length: 25 - minesCount },
        (_, index) => {
          return {
            type: "gem",
          };
        }
      );

      const commonArray = [...mineArray, ...gemArray];
      const newArrarray: TileTypes[] = [];
      commonArray.forEach((i, index) => {
        const randomNum: number = Math.random() * 24;
        console.log("i", Math.floor(randomNum));
        const temp = commonArray[index];
        commonArray[index] = commonArray[Math.floor(randomNum)];
        commonArray[Math.floor(randomNum)] = temp;
      });
      console.log("newArrayy---", newArrarray);
      setTiles(commonArray);
    }
  }, [minesCount, start]);

  const handletileClick = (index: number, type: "mine" | "gem") => {
    setSelectedTiles([...selectedTiles, index]);
    if (type === "mine") {
      setStart(false);
    }
  };

  const renderTiles = (item: TileTypes, index: number) => {
    return (
      <div>
        {selectedTiles.includes(index) ? (
          <div
            key={index}
            className={`p-4 text-4xl rounded-lg flex justify-center items-center h-24 w-24 bg-[#020213]`}
          >
            {item.type === "mine" ? "💣" : "💎"}
          </div>
        ) : (
          <div
            key={index}
            className={`p-4  rounded-lg flex justify-center items-center h-24 w-24 bg-[#020213] `}
            onClick={() => (start ? handletileClick(index, item.type) : "")}
          ></div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-5 w-fit p-4">
        {tiles.map(renderTiles)}
      </div>
    </>
  );
};

export default GameSection;
