import React from "react";
import { useState } from "react";
import {
  FaHandRock,
  FaHandPaper,
  FaHandScissors,
  FaHandLizard,
  FaHandSpock,
} from "react-icons/fa";

import styles from "./Game.module.css";

export function Game() {
  const [user, setUser] = useState<string | null>(null);
  const [computer, setComputer] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");

  const options = [
    { name: "rock", icon: <FaHandRock size={40} /> },
    { name: "paper", icon: <FaHandPaper size={40} /> },
    { name: "scissors", icon: <FaHandScissors size={40} /> },
    { name: "lizard", icon: <FaHandLizard size={40} /> },
    { name: "spock", icon: <FaHandSpock size={40} /> },
  ];

  const wins: Record<string, string[]> = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["paper", "spock"],
    spock: ["scissors", "rock"],
  };

  function getWinner(userChoise: string, computerChoice: string) {
    if (userChoise === computerChoice) {
      return "It s a tie!";
    }
    if (wins[userChoise].includes(computerChoice)) {
      return "You win!";
    }
    return "Computer wins!";
  }

  function handleUserChoise(choise: string) {
    const computerChoise =
      options[Math.floor(Math.random() * options.length)].name;
    setUser(choise);
    setComputer(computerChoise);
    setResult(getWinner(choise, computerChoise));
  }

  return (
    <div className={styles.gameContainer}>
      <h1>GAME</h1>
      <h2>Rock, Paper, Scissors, Lizard, Spock</h2>

      <div className={styles.buttonRow}>
        {options.map((opt) => (
          <button
            key={opt.name}
            className={styles.gameBtn}
            onClick={() => handleUserChoise(opt.name)}
            aria-label={opt.name}
          >
            {opt.icon}
            <div className={styles.btnLabel}>
              {opt.name.charAt(0).toUpperCase() + opt.name.slice(1)}
            </div>
          </button>
        ))}
      </div>

      {user && computer && (
        <div className={styles.results}>
          <h3>
            Your choice: <b>{user}</b>{" "}
            {options.find((o) => o.name === user)?.icon}
          </h3>
          <h3>
            Computer's choice: <b>{computer}</b>{" "}
            {options.find((o) => o.name === computer)?.icon}
          </h3>
          <h2>{result}</h2>
        </div>
      )}
    </div>
  );
}
