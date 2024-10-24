import React, {useState} from "react";
import "./Counters.scss";

import Altar from "./assets/altarOfTheGoyf.png";
import Barrowgoyf from "./assets/barrowgoyf.png";
import Detritivore from "./assets/detritivore.png";
import Formless_Genesis from "./assets/formlessGenesis.png";
import Lhurgoyf from "./assets/lhurgoyf.png";
import Lord_of_Extinction from "./assets/lordOfExtinction.png";
import Magnivore from "./assets/magnivore.png";
import Mortivore from "./assets/mortivore.png";
import Necrogoyf from "./assets/necrogoyf.png";
import Nethergoyf from "./assets/nethergoyf.png";
import Polygoyf from "./assets/polygoyf.png";
import Pyrogoyf from "./assets/pyrogoyf.png";
import Tarmogoyf from "./assets/tarmogoyf.png";
import Terravore from "./assets/terravore.png";

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
  const [lifeCounter, setLifeCounter] = useState(40);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visibility, setVisibility] = useState(
    Object.keys(counterCardImages).reduce((acc, key) => {
      acc[key] = counterCardImages[key].map(() => false); // Default all images to visible
      return acc;
    }, {})
  );

  // Increment life value
  const handleIncrementLife = (amount) => {
    setLifeCounter(lifeCounter + 1);
  };

  // Handle manual life input change
  const handleLifeInputChange = (e, name) => {
    const value = parseInt(e.target.value, 10);
    setLifeCounter(value);
  };

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

  // Toggle visibility of an image
  const toggleVisibility = (category, index) => {
    setVisibility((prevVisibility) => ({
      ...prevVisibility,
      [category]: prevVisibility[category].map((v, i) => (i === index ? !v : v)),
    }));
    console.log(visibility);
  };

  // Handle drawer toggle
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <div className="counters-container">
        <button className="drawer-toggle-button" onClick={handleDrawerToggle}>
          Menu
        </button>
        {drawerOpen && (
          <div className="drawer">
            {Object.keys(counterCardImages).map((category) =>
              counterCardImages[category].map((image, index) => (
                <div key={`${category}-${index}`} className="drawer-item">
                  <div className="drawer-row">
                    <button onClick={() => toggleVisibility(category, index)}>{visibility[category][index] ? "👁️" : "🚫"}</button>
                    <img src={image} alt="card image" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Life */}
        <div className="life-counter">
          <div className="incrementers">
            <div className="incrementer" onClick={() => handleIncrement(name)}>
              +
            </div>
            <div className="incrementer" onClick={() => handleDecrement(name)}>
              <div className="minus-icon" />
            </div>
          </div>
          <div className="count-wrapper">
            <input type="number" className="count-input" value={lifeCounter} onChange={(e) => handleLifeInputChange(e)} />
          </div>
        </div>

        {/* Counter and Images */}
        {Object.keys(counters).map((name) => (
          <div className="row" key={name} style={{display: visibility[name].includes(true) ? "flex" : "none"}}>
            <div className="counter">
              <div className="incrementers">
                <div className="incrementer" onClick={() => handleIncrement(name)}>
                  +
                </div>
                <div className="incrementer" onClick={() => handleDecrement(name)}>
                  <div className="minus-icon" />
                </div>
              </div>
              <div className="count-wrapper">
                <div className="row-name">{counterDisplayNames[name]}</div>
                <input type="number" className="count-input" value={counters[name]} onChange={(e) => handleInputChange(e, name)} />
              </div>
            </div>
            <div className="cards">{counterCardImages[name].map((cardImage, index) => visibility[name][index] && <img className="card-image" key={index} src={cardImage} alt={`${counterDisplayNames[name]} card art`} />)}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
