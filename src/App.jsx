import React, {useState} from "react";
import "./Counters.scss";

import tarmogoyf from "./assets/tarmogoyf.jpg";
import detritivore from "./assets/detritivore.jpg";
import mortivore from "./assets/mortivore.jpg";
import magnivore from "./assets/magnivore.jpg";
import terravore from "./assets/terravore.webp";
import fgenesis from "./assets/fgenesis.jpg";
import lord from "./assets/lord.jpg";

// Define the display names and background images for the counters
const counterDisplayNames = {
  allCardsCount: "All Cards",
  allTypesCount: "All Types",
  allCreaturesCount: "All Creatures",
  allLandsCount: "All Lands",
  allSorceriesCount: "All Sorceries",
  yourLandsCount: "Your Lands",
  detritivoreCount: "Detritivore",
};

const counterBackgroundImages = {
  allCardsCount: lord,
  allTypesCount: tarmogoyf,
  allCreaturesCount: mortivore,
  allLandsCount: terravore,
  allSorceriesCount: magnivore,
  yourLandsCount: fgenesis,
  detritivoreCount: detritivore,
};

const App = () => {
  // Define the initial state for the counters
  const initialCounters = {
    allCardsCount: 0,
    allTypesCount: 0,
    allCreaturesCount: 0,
    allLandsCount: 0,
    allSorceriesCount: 0,
    detritivoreCount: 0,
    yourLandsCount: 0,
  };

  const [counters, setCounters] = useState(initialCounters);

  // Increment counter value
  const handleIncrement = (name) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [name]: prevCounters[name] + 1,
    }));
  };

  // Decrement counter value
  const handleDecrement = (name) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [name]: prevCounters[name] - 1,
    }));
  };

  return (
    <div className="counters-container">
      {Object.keys(counters).map((name) => (
        <div className="row" key={name}>
          <div
            className="bg"
            style={{
              backgroundImage: `url(${counterBackgroundImages[name]})`,
            }}
          />
          <div className="row-name">{counterDisplayNames[name]}</div>
          <div className="counter">
            <div className="incrementer" onClick={() => handleDecrement(name)}>
              <div className="minus-icon" />
            </div>
            <div className="count">{counters[name]}</div>
            <div className="incrementer" onClick={() => handleIncrement(name)}>
              +
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
