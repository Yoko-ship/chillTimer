"use client";
import classes from "@/app/page.module.css";
import { useAppDispatch, useAppSelect } from "@/store/hooks";
import { openModal, resetHours, addHours } from "@/store/timerStore";
import { useEffect, useRef, useState } from "react";

function Timer() {
  const dispatch = useAppDispatch();
  const timerTime = useAppSelect((state) => state.hours.hours);
  const timerName = useAppSelect((state) => state.hours.timerName);
  const data: any = useAppSelect((state) => state.modal.object);
  const [time, setTime] = useState(timerTime);
  const [url, setUrl] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setTime(timerTime);
  }, [timerTime]);

  useEffect(() => {
    dispatch(addHours(time));
  }, [time]);

  useEffect(() => {
    if (data.music) {
      const url = data.music.replace('watch?v=', 'embed/').replace('www.youtube.com', 'www.youtube-nocookie.com');
      console.log(url)
      setUrl(url);
    }
  }, [data]);

  console.log(data);

  const startHanlder = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        const [h, m, s] = prevTime.split(":").map(Number);
        let totalSeconds = h * 3600 + m * 60 + s;
        if (totalSeconds <= 0) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return "00:00:00";
        }

        totalSeconds -= 1;
        setProgress(totalSeconds);
        const newH = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
        const newM = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
          2,
          "0"
        );
        const newS = String(totalSeconds % 60).padStart(2, "0");
        return `${newH}:${newM}:${newS}`;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
  };
  const resetHandler = () => {
    dispatch(resetHours());
    setProgress(0);
  };

  return (
    <>
      <section className={classes.timer}>
        <span onClick={() => dispatch(openModal())}>{timerTime}</span>
        <button className={classes.start} onClick={startHanlder}>
          Start
        </button>
        <button className={classes.stop} onClick={stopTimer}>
          Stop
        </button>
        <button className={classes.reset} onClick={resetHandler}>
          Reset
        </button>
      </section>
      <section className={classes.ui}>
        <p>
          {timerName} {`(${timerTime})`}
        </p>
        <progress max={progress + 1} value={progress}></progress>
      </section>

      {data && (
        <section className={classes.data}>
          <h3>{data.motivation}</h3>
          <p>{data.food}</p>
          {url && (
            <iframe width="50%" height="200" allowFullScreen src={url}></iframe>
          )}
        </section>
      )}
    </>
  );
}

export default Timer;
