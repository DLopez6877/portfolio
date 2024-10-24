import React, {useState} from "react";
import "./Counters.scss";

import Altar from "./assets/Altar_of_the_Goyf.jpg";
import Barrowgoyf from "./assets/Barrowgoyf.jpg";
import Detritivore from "./assets/Detritivore.jpg";
import Formless_Genesis from "./assets/Formless_Genesis.jpg";
import Lhurgoyf from "./assets/Lhurgoyf.jpg";
import Lord_of_Extinction from "./assets/Lord_of_Extinction.jpg";
import Magnivore from "./assets/Magnivore.jpg";
import Mortivore from "./assets/Mortivore.jpg";
import Necrogoyf from "./assets/Necrogoyf.jpg";
import Nethergoyf from "./assets/Nethergoyf.jpg";
import Polygoyf from "./assets/Polygoyf.jpg";
import Pyrogoyf from "./assets/Pyrogoyf.jpg";
import Tarmogoyf from "./assets/Tarmogoyf.jpg";
import Terravore from "./assets/Terravore.jpg";

// Define the display names and background images for the counters
const counterDisplayNames = {
  allCardsCount: "All Cards",
  allTypesCount: "All Types",
  allCreaturesCount: "All Creatures",
  allLandsCount: "All Lands",
  allSorceriesCount: "All Sorceries",
  yourTypesCount: "Your Types",
  yourLandsCount: "Your Lands",
  detritivoreCount: "Detritivore",
};

const counterCardImages = {
  allCardsCount: [Lord_of_Extinction],
  allTypesCount: [Altar, Barrowgoyf, Polygoyf, Pyrogoyf, Tarmogoyf],
  allCreaturesCount: [Lhurgoyf, Mortivore, Necrogoyf],
  allLandsCount: [Terravore],
  allSorceriesCount: [Magnivore],
  yourTypesCount: [Nethergoyf],
  yourLandsCount: [Formless_Genesis],
  detritivoreCount: [Detritivore],
};

const App = () => {
  // Define the initial state for the counters
  const initialCounters = {
    allCardsCount: 0,
    allTypesCount: 0,
    allCreaturesCount: 0,
    allLandsCount: 0,
    allSorceriesCount: 0,
    yourTypesCount: 0,
    yourLandsCount: 0,
    detritivoreCount: 0,
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

  // Handle manual input change
  const handleInputChange = (e, name) => {
    const value = parseInt(e.target.value, 10);
    setCounters((prevCounters) => ({
      ...prevCounters,
      [name]: isNaN(value) ? 0 : value,
    }));
  };

  return (
    <div className="counters-container">
      {Object.keys(counters).map((name) => (
        <div className="row" key={name}>
          <div className="row-name">{counterDisplayNames[name]}</div>
          <div className="cards">
            {counterCardImages[name].map((cardImage, index) => (
              <img key={index} src={cardImage} alt={`${counterDisplayNames[name]} card art`} />
            ))}
          </div>
          <div className="counter">
            <div className="incrementer" onClick={() => handleDecrement(name)}>
              <div className="minus-icon" />
            </div>
            <input type="number" className="count-input" value={counters[name]} onChange={(e) => handleInputChange(e, name)} />
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
