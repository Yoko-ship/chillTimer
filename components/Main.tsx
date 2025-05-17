"use client";
import Modal from "./Modal";
import { makeStore } from "@/store/store";
import { Provider } from "react-redux";
import Timer from "./Timer";

function Main() {
  const store = makeStore();

  return (
    <main>
      <Provider store={store}>
        <Modal/>
        <Timer/>
      </Provider>
    </main>
  );
}

export default Main;
