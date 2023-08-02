import React, { useState, useEffect } from "react";
import axios from "axios";

const Searchword = () => {

  //this state denote value of searched word
  const [searchKey, setSearchKey] = useState("");
  //this state denote response when user search any word (word information from api)
  const [wordInfo, setWordInfo] = useState(null);
  //this state denote array for recently searched words
  const [recentSearches, setRecentSearches] = useState([]);
  //this state denote information of word when we click on any recently searched word
  const [selectedWordInfo, setSelectedWordInfo] = useState(null);
  //this state denote to decide the recently searched words will be visible or not
  const [showRecentSearches, setShowRecentSearches] = useState(true);
  //this state denote error we get when we search some word which has no meaning and api will fetch bad request
  const [error, setError] = useState(null);

  const api = "https://api.dictionaryapi.dev/api/v2/entries/en";

  //handles search of word//
  const handleSearch = async () => {
    try {
      const response = await axios.get(`${api}/${searchKey}`);
      if (response.data && response.data.length > 0) {
        setWordInfo(response.data[0]);
        storeDataInLocalStorage(searchKey, response.data[0]);
        //hide searches when word is searched
        setShowRecentSearches(false);
      } else {
      
        setError("sorry, this word is not available.");
        setShowRecentSearches(false);
      }
    } catch (error) {
      console.log("error fetching word:", error);
      setError("sorry, there was an error fetching the word.");
      setShowRecentSearches(false);
    }
  };

  //handles clear button
  const handleClear = () => {
    setSearchKey(null);
    setWordInfo(null);
    setSelectedWordInfo(null);
    setShowRecentSearches(true);
    setError(null);
  };
  //store data in local storage
  const storeDataInLocalStorage = (searchKey, data) => {
    try {
      const storedData =
        JSON.parse(localStorage.getItem("recentSearches")) || [];

      storedData.unshift({ word: searchKey, data });
      if (storedData.length > 10) {
        storedData.pop();
      }

      localStorage.setItem("recentSearches", JSON.stringify(storedData));
      setRecentSearches(storedData);
    } catch (error) {
      console.error("error storing data in local storage:", error);
    }
  };

  //retrive data from local storage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedData);
  }, []);

  //handles recently searched words
  const handleRecentWordClick = (selectedWord) => {
    setSelectedWordInfo(selectedWord.data);
    //hide recent searches//
    setShowRecentSearches(false);
  };

  return (
    <div>
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          className="btn btn-outline-success"
          value={searchKey}
          onClick={handleSearch}
          type="button"
        >
          Search
        </button>
        <button
          className="btn btn-outline-success ms-3"
          onClick={handleClear}
          type="button"
        >
          Clear
        </button>
      </form>
      {/*show the word information when any word is searched*/}
      {wordInfo && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">{wordInfo.word}</h5>
            {wordInfo.phonetics && wordInfo.phonetics[0] && (
              <p className="card-text">
                Pronunciation: {wordInfo.phonetics[0].text}
              </p>
            )}
            {wordInfo.phonetics &&
              wordInfo.phonetics[0] &&
              wordInfo.phonetics[0].audio && (
                <audio controls>
                  <source src={wordInfo.phonetics[0].audio} type="audio/mpeg" />
                  your browser does not support the audio element.
                </audio>
              )}
            {wordInfo.meanings &&
              wordInfo.meanings.map((meaning, index) => (
                <div key={index}>
                  <h6>Part of Speech: {meaning.partOfSpeech}</h6>
                  {meaning.definitions.map((definition, i) => (
                    <p key={i}>
                      Definition {i + 1}: {definition.definition}
                    </p>
                  ))}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* show information of word when we clicked on past searched word */}
      {selectedWordInfo && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">{selectedWordInfo.word}</h5>
            {selectedWordInfo.phonetics && selectedWordInfo.phonetics[0] && (
              <p className="card-text">
                Pronunciation: {selectedWordInfo.phonetics[0].text}
              </p>
            )}
            {selectedWordInfo.phonetics &&
              selectedWordInfo.phonetics[0] &&
              selectedWordInfo.phonetics[0].audio && (
                <audio controls>
                  <source
                    src={selectedWordInfo.phonetics[0].audio}
                    type="audio/mpeg"
                  />
                  your browser does not support the audio element.
                </audio>
              )}
            {selectedWordInfo.meanings &&
              selectedWordInfo.meanings.map((meaning, index) => (
                <div key={index}>
                  <h6>Part of Speech: {meaning.partOfSpeech}</h6>
                  {meaning.definitions.map((definition, i) => (
                    <p key={i}>
                      Definition {i + 1}: {definition.definition}
                    </p>
                  ))}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* show the recent searches */}
      {wordInfo === null && selectedWordInfo === null && showRecentSearches && (
        <div className="mt-4">
          <div className="bg-primary p-3 rounded">
            <h4>Recent Searches</h4>
            <ul className="list-unstyled">
              {recentSearches.map((item, index) => (
                //click handler to the recent search words
                <li key={index} onClick={() => handleRecentWordClick(item)}>
                  <div className="bg-white p-2 mt-2 mb-2 rounded">
                    {item.word}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {error && !showRecentSearches &&(
        <div className="mt-4">
          <div className="bg-danger p-3 rounded">
            <h4>Error</h4>
            <p>{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchword;
