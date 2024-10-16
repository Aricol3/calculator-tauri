import "./App.css";
import { Button } from "@nextui-org/react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

function App() {
  const appWindow = getCurrentWindow();
  const [output, setOutput] = useState<string>("0");

  // const [expression, setExpression] = useState<string>("");

  async function evaluateExpression() {
    setOutput(await invoke("evaluate_expression",{expression:output}));
  }

  const clearOutput = () => {
    setOutput("0");
  };

  const concatNumber = (number: number) => {
    if (output === "0") setOutput(number.toString());
    else setOutput(prevOutput => prevOutput + number.toString());
  };

  const addDot = () => {
    setOutput((prevOutput) => {
      if (!prevOutput.includes('.')) {
        return prevOutput + '.';
      }
      return prevOutput;
    });
  };

  const removeLast = () => {
    setOutput((prevOutput) => {
      if (prevOutput.length > 1) {
        return prevOutput.slice(0, -1);
      } else {
        return "0";
      }
    });
  };

  const addOperator= (operator :string)=>{
    setOutput(prevOutput => prevOutput + operator);
  }

  const squareRoot= ()=>{
    setOutput(prevOutput => "sqrt("+prevOutput + ")");
  }

  const makeFraction= ()=>{
    setOutput(prevOutput => "1/"+prevOutput);
  }

  return (
    <>
      <div data-tauri-drag-region id="titlebar" className="titlebar z-10">
        <div className="titlebar-button" id="titlebar-minimize" onClick={() => appWindow.minimize()}>
          <img
            src="https://api.iconify.design/mdi:window-minimize.svg"
            alt="minimize"
          />
        </div>
        <div className="titlebar-button" id="titlebar-close" onClick={() => appWindow.close()}>
          <img src="https://api.iconify.design/mdi:close.svg" alt="close" />
        </div>
      </div>
      <div className="container pt-4">
        <h1>{output}</h1>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1 self-center">
            <Button radius="sm">%</Button>
            <Button radius="sm">CE</Button>
            <Button onClick={() => clearOutput()} radius="sm">C</Button>
            <Button onClick={() => removeLast()} radius="sm">DEL</Button>
          </div>
          <div className="flex gap-1 self-center">
            <Button onClick={()=>makeFraction()} radius="sm">⅟ₓ</Button>
            <Button onClick={()=>addOperator("^2")} radius="sm">x²</Button>
            <Button onClick={()=>squareRoot()} radius="sm">√</Button>
            <Button onClick={()=>addOperator("/")} radius="sm">÷</Button>
          </div>
          <div className="flex gap-1 self-center">
            <Button onClick={() => concatNumber(7)} radius="sm">7</Button>
            <Button onClick={() => concatNumber(8)} radius="sm">8</Button>
            <Button onClick={() => concatNumber(9)} radius="sm">9</Button>
            <Button onClick={()=>addOperator("*")} radius="sm">×</Button>
          </div>
          <div className="flex gap-1 self-center">
            <Button onClick={() => concatNumber(4)} radius="sm">4</Button>
            <Button onClick={() => concatNumber(5)} radius="sm">5</Button>
            <Button onClick={() => concatNumber(6)} radius="sm">6</Button>
            <Button onClick={()=>addOperator("-")} radius="sm">–</Button>
          </div>
          <div className="flex gap-1 self-center">
            <Button onClick={() => concatNumber(1)} radius="sm">1</Button>
            <Button onClick={() => concatNumber(2)} radius="sm">2</Button>
            <Button onClick={() => concatNumber(3)} radius="sm">3</Button>
            <Button onClick={()=>addOperator("+")} radius="sm">+</Button>
          </div>
          <div className="flex gap-1 self-center">
            <Button radius="sm">⁺⁄₋</Button>
            <Button onClick={() => concatNumber(0)} radius="sm">0</Button>
            <Button onClick={()=> addDot()} radius="sm">.</Button>
            <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" onClick={()=>evaluateExpression()} radius="sm">=</Button>
          </div>
        </div>

      </div>

    </>
  );
}

export default App;
