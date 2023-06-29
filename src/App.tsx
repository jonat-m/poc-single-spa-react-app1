import { useState } from "react";
import { ParcelConfig } from "single-spa";
import Parcel from "single-spa-react/parcel";
import { v4 as uuid } from "uuid";

import { emitEvent } from "@org/utils";

const config: ParcelConfig = () => System.import("@org/react-parcel");

export default function App({ name }) {
  const [task, setTask] = useState("");

  function handleChange(event: any) {
    setTask(event.target.value);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    emitEvent("@org/react-app1/todo/add-task", {
      id: uuid(),
      describe: task,
    });

    setTask("");
  }

  return (
    <>
      <h1>{name}</h1>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={task} />
        <button>Add</button>
      </form>
      <Parcel config={config} />
    </>
  );
}
