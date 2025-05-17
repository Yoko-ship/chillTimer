"use client";
import { createPortal } from "react-dom";
import React, {ChangeEvent, SetStateAction, useEffect,useState } from "react";
import classes from "./modal.module.css";
import { useAppDispatch,useAppSelect} from "@/store/hooks";
import { addHours,closeModal,setTimerName,getObject} from "@/store/timerStore";
import { Dispatch } from "react";
import { getRecommendations } from "@/lib/hanlder";

const helper = (target:ChangeEvent<HTMLInputElement>,limit:number,outLimit:number,setFunction:Dispatch<SetStateAction<number>>)=>{
  const value = +target.target.value
  if(!isNaN(value) && value <= limit){
    setFunction(value)
  }else if(value > outLimit){
    setFunction(outLimit)
  }
}

const Modal = () => {
  const [mounted, setMounted] = useState(false);
  const [hour,setHour] = useState(0);
  const [minute,setMinute] = useState(0);
  const [second,setSecond] = useState(0);
  const [timerName,setTimeName] = useState("")
  const dispatch = useAppDispatch()
  const isOpen = useAppSelect((state) => state.modal.isOpen);

  useEffect(() => {
    setMounted(true);
  }, []);


  const hoursHanlder = (e:ChangeEvent<HTMLInputElement>) =>{
    helper(e,99,99,setHour)
  }
  const minutesHanlder =(e:ChangeEvent<HTMLInputElement>) =>{
    helper(e,59,59,setMinute)
  }
  const secondsHanlder =(e:ChangeEvent<HTMLInputElement>) =>{
    helper(e,59,59,setSecond)
  }
  
  
  const confirmHandler = async() =>{
    const fullHours = String(hour).padStart(2,"0");
    const fullMinutes = String(minute).padStart(2,"0");
    const fullSeconds = String(second).padStart(2,"0");
    const fullTime = `${fullHours}:${fullMinutes}:${fullSeconds}`
    dispatch(addHours(fullTime))
    dispatch(setTimerName(timerName))
    dispatch(closeModal())
    const data = await getRecommendations(fullTime,timerName)
    dispatch(getObject(data))
  }


  if (!mounted) return null;
  return createPortal(
    <>
    <div className={isOpen ? classes.backdrop : undefined}></div>
      <dialog open={isOpen} className={classes.dialog}>
        <section className={classes.edit}>
          <h2>Edit Timer</h2>
          <button onClick={() => dispatch(closeModal())}>×</button>
        </section>
        <section className={classes.main}>
          <div className={classes.times}>
            <input type="number" min={0}  onChange={hoursHanlder} value={hour}/>
            <label>Hrs</label>
          </div>
          <div className={classes.times}>
            <input type="number" min={0} onChange={minutesHanlder} value={minute}/>
            <label>Mins</label>
          </div>
          <div className={classes.times}>
            <input type="number" min={0} onChange={secondsHanlder} value={second}/>
            <label>Secs</label>
          </div>
        </section>
        <hr></hr>
        <section className={classes.name}>
          <label>Timer Name:</label>
          <input type="text" onChange={(e) => setTimeName(e.target.value)} required/>
        </section>
        <footer className={classes.footer}>
          <button onClick={confirmHandler}>Подтвердить</button>
        </footer>
      </dialog>
    </>,
    document.getElementById("modal")!
  );
};

export default Modal;
