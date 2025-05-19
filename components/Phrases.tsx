import { getRandomPhrase } from "@/lib/phrase";
import React, { useEffect, useState } from "react";
import classes from "./phrases.module.css"

const Phrases: React.FC<{ progress: number }> = ({ progress }) => {
  const [randomPhrases, setRandomPhrases] = useState("");
  const [show,setShow] = useState(false)

  useEffect(() => {
    let interval:ReturnType<typeof setInterval>
    if (progress >= 1799) {
      interval = setInterval(() => {
        const randomPhrase = getRandomPhrase()[0];
        setRandomPhrases(randomPhrase);
      },60000 * 20);
    }
    return () => {
        if(interval) clearInterval(interval);
      };
  }, [progress >= 1799]);

  useEffect(() =>{
    if(randomPhrases){
        setShow(true)
    }
  },[randomPhrases])

  return (
    <main className={show ? classes.sidebar : classes.notShow}>
        <section className={classes.advice}>
            <p>Рекомендации</p>
            <button onClick={() => setShow(false)}>✖</button>
        </section>
        <section className={classes.content}>
            <p>{randomPhrases}</p>
        </section>
    </main>
  );
};

export default Phrases;
