"use client";
import { createPortal } from "react-dom";
import { Dispatch, useEffect, useState } from "react";
import classes from "./modal.module.css";
const Modal:React.FC<{isOpen: boolean, setIsOpen: Dispatch<boolean>}> = ({isOpen,setIsOpen}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return createPortal(
    <>
    <div className={isOpen ? classes.backdrop : undefined}></div>
      <dialog open={isOpen} className={classes.dialog}>
        <section className={classes.edit}>
          <h2>Edit Timer</h2>
          <button onClick={() => setIsOpen(false)}>×</button>
        </section>
        <section className={classes.main}>
          <div className={classes.times}>
            <input type="number" />
            <label>Hrs</label>
          </div>
          <div className={classes.times}>
            <input type="number" />
            <label>Mins</label>
          </div>
          <div className={classes.times}>
            <input type="number" />
            <label>Secs</label>
          </div>
        </section>
        <hr></hr>
        <section className={classes.name}>
          <label>Timer Name:</label>
          <input type="text" />
        </section>
        <footer className={classes.footer}>
          <button>Подтвердить</button>
        </footer>
      </dialog>
    </>,
    document.getElementById("modal")!
  );
};

export default Modal;
