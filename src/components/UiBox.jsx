import React, { useEffect, useRef } from "react";
import useGeneratingPass from "./useGeneratingPass";

const UiBox = () => {
  const {
    length,
    setLength,
    passwords,
    setCharacter,
    generatePassword,
    characters,
    numbers,
    setNumbers,
    setPassword,
  } = useGeneratingPass();

  const useref = useRef(null);
  const charactersRef = useRef(null);
  const numbersRef = useRef(null);

  // Call generatePassword only when length or other relevant states change
  useEffect(() => {
    generatePassword();
  }, [length, characters, numbers, generatePassword]); // Dependencies for generating passwords

  // Handle click outside to check the checkboxes
  const handleClickOutside = (event) => {
    if (useref.current && !useref.current.contains(event.target)) {
      setCharacter(true);
      setNumbers(true);
    }
  };

  // Adding event listener for clicks outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const copy = () => {
    useref.current.select();
    window.navigator.clipboard.writeText(passwords);
  };

  return (
    <div className="ui-box" ref={useref}>
      <div className="border-t-2 border-blue-500 mb-4"></div>
      <div className="bg-slate-600 p-4 max-w-md mx-auto">
        <div className="flex flex-col items-center">
          <div className="flex gap-1">
            <input
              className="p-2 px-2"
              value={passwords}
              type="text"
              readOnly
            />
            <button
              className="bg-slate-400 text-black rounded-md px-2"
              onClick={copy}
            >
              Copy
            </button>
          </div>
          <div className="mt-10">
            <input
              className="text-red-500"
              type="range"
              min={5}
              max={50}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <br />
            <label className="text-white" htmlFor="range">
              Label: {length}
            </label>
          </div>
          <div className="flex gap-5 text-2xl mt-6 items-baseline">
            <div className="flex items-baseline">
              <input
                id="character-checkbox"
                type="checkbox"
                checked={characters}
                onChange={() => setCharacter((prev) => !prev)} //
              />
              <label className="text-white ml-1" htmlFor="character-checkbox">
                Character
              </label>
            </div>
            <div className="flex items-baseline">
              <input
                id="numbers-checkbox"
                type="checkbox"
                checked={numbers}
                onChange={() => setNumbers((prev) => !prev)}
              />
              <label className="text-white ml-1" htmlFor="numbers-checkbox">
                Numbers
              </label>
            </div>
            <button
              className="bg-blue-400 text-white p-2 px-7 rounded-md mt-0"
              onClick={generatePassword}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UiBox;
