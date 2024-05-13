import "./styles.css";
import Card from "./Card";
import React, { useEffect, useState } from "react";

export default function App() {
  const [dateTime, setDateTime] = useState("");
  const [counterTimes, setCounterTimes] = useState([0, 0, 0, 0]);
  const [timerId, setTimerId] = useState(null);
  var CUnits = ["Days", "Hours", "Minutes", "Seconds"];
  const [notifi, setNotifi] = useState("");
  const startTimer = () => {
    const selectedDate = new Date(dateTime);
    const now = new Date();

    const timeDifference = selectedDate - now;
    console.log(timeDifference);
    if (timeDifference <= 0) {
      setNotifi("Selected time is in the past.");
      return;
    }
      if (timeDifference / (1000 * 60 * 60 * 24) > 99) {
      setNotifi("Selected time is more than 100.");
      return;
    }
    const intervalId = setInterval(() => {
      const timeDifference = selectedDate - new Date();
      if (timeDifference <= 0) {
        clearInterval(intervalId);
        setNotifi("Timer completed.");
        setCounterTimes([0, 0, 0, 0]);
      } else {
        setNotifi("");
        console.log(timeDifference);
        const seconds = Math.floor((timeDifference / 1000) % 60);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        setCounterTimes([days, hours, minutes, seconds]);
      }
    }, 1000);

    setTimerId(intervalId);
  };

  const handleDateTimeChange = (event) => {
    setDateTime(event.target.value);
  };

  const clearTimer = () => {
    clearInterval(timerId);
    setCounterTimes([0, 0, 0, 0]);
    setTimerId(null);
  };

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      <div className="input-container">
        <input
          type="datetime-local"
          className="btn"
          value={dateTime}
          onChange={handleDateTimeChange}
        />

        <button onClick={startTimer}>Start Timer</button>
        <button onClick={clearTimer}>Stop Timer</button>
      </div>

      <div className="cardContainer">
        {counterTimes.map((value, index) => (
          <Card item={CUnits[index]} value={value} />
        ))}
      </div>
      <div className="notification">{notifi}</div>
    </div>
  );
}
