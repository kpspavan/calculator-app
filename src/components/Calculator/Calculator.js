import React, { useState, useEffect } from "react";
import HistoryComponent from "../History/History";
import { FiDelete } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("0");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false); // Initialize showHistory to false

  const handleDigitClick = (digit) => {
    if (input === "0") {
      setInput(digit);
    } else {
      setInput((prevInput) => prevInput + digit);
    }
  };

  const handleOperatorClick = (operator) => {
    setInput((prevInput) => prevInput + operator);
  };

  const handleEqualsClick = () => {
    try {
      // Replace ÷ with / in the input
      const sanitizedInput = input.replace(/÷/g, "/");
      const result = eval(sanitizedInput);
      setHistory([...history, input + " = " + result]);
      setInput(result.toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const handleClearEndClick = () => {
    setInput((prevInput) => {
      const regex = /[-+*/]?\d*\.?\d*$/;
      const newInput = prevInput.replace(regex, "");
      return newInput === "" ? "0" : newInput;
    });
  };

  const handleClearClick = () => {
    setInput("0");
  };

  const handleBackspaceClick = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const handleToggleHistory = () => {
    setShowHistory((prevShowHistory) => !prevShowHistory); // Toggle the state
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem("calculatorHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("calculatorHistory", JSON.stringify(history));
  }, [history]);

  return (
    <div className="container">
      <div className="col">
        <GiHamburgerMenu className="GiHamburgerMenu" />
        <div className="screen">
          <div className={`output ${input === "0" ? "placeholder" : ""}`}>
            {input}
          </div>
        </div>
        <div className="buttons">
          <div className="row">
            <button className="Button" onClick={() => handleClearEndClick()}>
              CE
            </button>
            <button className="Button" onClick={() => handleClearClick()}>
              C
            </button>
            <button className="Button" onClick={() => handleBackspaceClick()}>
              <FiDelete />
            </button>
            <button className="Button" onClick={() => handleOperatorClick("÷")}>
              &divide;
            </button>
          </div>
          <div className="row">
            <button
              className="Button text-color"
              onClick={() => handleDigitClick("7")}
            >
              7
            </button>
            <button
              className="Button text-color"
              onClick={() => handleDigitClick("8")}
            >
              8
            </button>
            <button
              className="Button text-color"
              onClick={() => handleDigitClick("9")}
            >
              9
            </button>
            <button
              className="Button text-color"
              onClick={() => handleOperatorClick("*")}
            >
              x
            </button>
          </div>
          <div className="row">
            <button
              className="Button text-color"
              onClick={() => handleDigitClick("4")}
            >
              4
            </button>
            <button
              className="Button text-color"
              onClick={() => handleDigitClick("5")}
            >
              5
            </button>
            <button
              className="Button text-color"
              onClick={() => handleDigitClick("6")}
            >
              6
            </button>
            <button className="Button" onClick={() => handleOperatorClick("-")}>
              -
            </button>
          </div>
          <div className="row">
            <button
              className="Button text-color"
              onClick={() => handleDigitClick("1")}
            >
              1
            </button>
            <button
              className="Button text-color"
              onClick={() => handleDigitClick("2")}
            >
              2
            </button>
            <button
              className="Button text-color"
              onClick={() => handleDigitClick("3")}
            >
              3
            </button>
            <button
              className="Button text-color"
              onClick={() => handleOperatorClick("+")}
            >
              +
            </button>
          </div>
          <div className="row">
            <button className="Button text-color"></button>
            <button className="Button" onClick={() => handleDigitClick("0")}>
              0
            </button>
            <button className="Button" onClick={() => handleDigitClick(".")}>
              .
            </button>
            <button className="Button" onClick={() => handleEqualsClick()}>
              =
            </button>
          </div>
        </div>
      </div>
      <div className={`history-panel ${showHistory ? "show-history" : ""}`}>
        <HistoryComponent
          history={history}
          showHistory={showHistory}
          handleClearHistory={handleClearHistory}
          handleToggleHistory={handleToggleHistory}
        />
      </div>
    </div>
  );
};

export default Calculator;
