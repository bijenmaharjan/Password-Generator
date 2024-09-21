import { useState, useCallback } from "react";

const useGeneratingPass = () => {
  const [length, setLength] = useState(5);
  const [passwords, setPassword] = useState("");
  const [characters, setCharacter] = useState(false);
  const [numbers, setNumbers] = useState(false);

  const generatePassword = useCallback(() => {
    let password = "";
    let character = "ABCDEFGHIJKLMNOPQRSTUVWXYZqwertyuiopasdfghjklzxcvbnm";

    if (characters) character += "@##!!@#&&$%&!";
    if (numbers) character += "1234567890";

    for (let i = 0; i <= length; i++) {
      let charac = Math.floor(Math.random() * character.length);
      password += character.charAt(charac);
    }

    setPassword(password); //passing the value of password as argument in setPassword function.
  }, [length, characters, numbers]);

  // Return the relevant state and the generatePassword function
  return {
    length,
    setLength,
    passwords,
    setCharacter,
    setNumbers,
    setPassword,
    generatePassword,
    characters,
    numbers,
  };
};

export default useGeneratingPass;
