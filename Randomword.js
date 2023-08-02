import React, { useEffect, useState } from "react";
import axios from "axios";

//this component is left part of home page
const Randomword = () => {
  const [Randomword, setRandomword] = useState("");

  useEffect(() => {
    const fetchRandomword = async () => {
      try {
        const response = await axios.get(
          "https://random-word-api.herokuapp.com/word"
        );
        console.log(response);
        const randomWord = response.data[0];
        if (randomWord) {
          setRandomword(randomWord);
          console.log("random word fetched:", randomWord);
        }
        else {
          throw new Error("received undefined or empty word from the API.");
        }
      } catch (error) {
        console.error("error fetching random word:", error);
        setRandomword("error: Failed to fetch random word");
      }
    };

    fetchRandomword();
  }, []);

  return (
    <div>
      <h1>Random Word of the Day:</h1>
      <div className="bg-white rounded text-primary">
      {Randomword ? <h2>{Randomword}</h2> : <h3>Loading...</h3>}
      </div>
    </div>
  );
};

export default Randomword;
