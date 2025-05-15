'use client'
import { useState } from "react"
import Modal from "./Modal"
import classes from "@/app/page.module.css"

function Main() {
  const [isOpen,setIsOpen] = useState(false)
  return (
    <main>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}/>
        <section className={classes.timer}>
          <span onClick={() => setIsOpen(true)}>00:02:00</span>
          <button className={classes.start}>Start</button>
          <button className={classes.reset}>Reset</button>
        </section>

        <section className={classes.ui}>
        <progress></progress>
        </section>
    </main>
  )
}

export default Main