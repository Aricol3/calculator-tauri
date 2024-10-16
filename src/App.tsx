import "./App.css";
import { Button } from "@nextui-org/react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import React, { useState, useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";

function App() {
  const appWindow = getCurrentWindow();
  const [output, setOutput] = useState<string>("0");
  const outputRef = useRef(output);

  useEffect(() => {
    outputRef.current = output;
  }, [output]);

  const handleButtonClick = (callback: () => void) => {
    return (event: React.MouseEvent<HTMLButtonElement>) => {
      event.currentTarget.blur();
      callback();
    };
  };

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      const { key } = event;
      console.log("Current Output:", outputRef.current);

      if (!isNaN(Number(key))) {
        concatNumber(Number(key));
      } else if (key === ".") {
        addDot();
      } else if (key === "Enter" || key === "=") {
        await evaluateExpression();
      } else if (key === "Backspace") {
        removeLast();
      } else if (key === "Escape") {
        clearOutput();
      } else if (key === "+") {
        addOperator("+");
      } else if (key === "-") {
        addOperator("-");
      } else if (key === "*") {
        addOperator("*");
      } else if (key === "/") {
        addOperator("/");
      } else if (key === "%") {
        addOperator("%");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  async function evaluateExpression() {
    try {
      let expressionToEvaluate = outputRef.current;
      const lastChar = expressionToEvaluate.slice(-1);

      if ("+-*/%".includes(lastChar)) {
        expressionToEvaluate = expressionToEvaluate.slice(0, -1);
      }

      const result: string = await invoke("evaluate_expression", { expression: expressionToEvaluate });
      setOutput(result.toString());
    } catch (error) {
      setOutput("Error");
    }
  }

  const clearOutput = () => {
    setOutput("0");
  };

  const concatNumber = (number: number) => {
    setOutput((prevOutput) => {
      if (prevOutput === "0" || prevOutput === "Error") {
        return number.toString();
      }

      const lastChar = prevOutput.slice(-1);
      if (lastChar === ")") {
        return prevOutput + "*" + number.toString();
      }

      return prevOutput + number.toString();
    });
  };


  const addDot = () => {
    setOutput((prevOutput) => {
      if (prevOutput.includes(".")) return prevOutput;
      return prevOutput + ".";
    });
  };

  const removeLast = () => {
    setOutput((prevOutput) => {
      if (prevOutput.length > 1 && prevOutput !== "Error") {
        return prevOutput.slice(0, -1);
      }
      return "0";
    });
  };

  const addOperator = (operator: string) => {
    setOutput((prevOutput) => {
      if (prevOutput === "Error") return "0";
      const lastChar = prevOutput.slice(-1);
      if ("+-*/%".includes(lastChar)) {
        return prevOutput.slice(0, -1) + operator;
      }
      return prevOutput + operator;
    });
  };

  const squareRoot = () => {
    setOutput((prevOutput) => {
      if (prevOutput === "Error") return "0";

      const lastChar = prevOutput.slice(-1);
      if ("+-*/%".includes(lastChar)) {
        return `sqrt(${prevOutput.slice(0, -1)})`;
      }

      return `sqrt(${prevOutput})`;
    });
  };

  const makeFraction = () => {
    setOutput((prevOutput) => {
      if (prevOutput === "Error") return "0";

      const lastChar = prevOutput.slice(-1);
      if ("+-*/%".includes(lastChar)) {
        return `1/(${prevOutput.slice(0, -1)})`;
      }

      return `1/(${prevOutput})`;
    });
  };

  const toggleSign = () => {
    setOutput((prevOutput) => {
      if (prevOutput === "Error") return "0";
      if (prevOutput.startsWith("-")) {
        return prevOutput.slice(1);
      }
      return "-" + prevOutput;
    });
  };

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
            <Button onClick={handleButtonClick(() => addOperator("%"))} radius="sm">%</Button>
            <Button onClick={handleButtonClick(() => clearOutput())} radius="sm">CE</Button>
            <Button onClick={handleButtonClick(() => clearOutput())} radius="sm">C</Button>
            <Button onClick={handleButtonClick(() => removeLast())} radius="sm">DEL</Button>
          </div>
          <div className="flex gap-1 self-center">
            <Button onClick={handleButtonClick(() => makeFraction())} radius="sm">⅟ₓ</Button>
            <Button onClick={handleButtonClick(() => addOperator("^2"))} radius="sm">x²</Button>
            <Button onClick={handleButtonClick(() => squareRoot())} radius="sm">√</Button>
            <Button onClick={handleButtonClick(() => addOperator("/"))} radius="sm">÷</Button>
          </div>
          <div className="flex gap-1 self-center">
            <Button onClick={handleButtonClick(() => concatNumber(7))} radius="sm">7</Button>
            <Button onClick={handleButtonClick(() => concatNumber(8))} radius="sm">8</Button>
            <Button onClick={handleButtonClick(() => concatNumber(9))} radius="sm">9</Button>
            <Button onClick={handleButtonClick(() => addOperator("*"))} radius="sm">×</Button>
          </div>
          <div className="flex gap-1 self-center">
            <Button onClick={handleButtonClick(() => concatNumber(4))} radius="sm">4</Button>
            <Button onClick={handleButtonClick(() => concatNumber(5))} radius="sm">5</Button>
            <Button onClick={handleButtonClick(() => concatNumber(6))} radius="sm">6</Button>
            <Button onClick={handleButtonClick(() => addOperator("-"))} radius="sm">–</Button>
          </div>
          <div className="flex gap-1 self-center">
            <Button onClick={handleButtonClick(() => concatNumber(1))} radius="sm">1</Button>
            <Button onClick={handleButtonClick(() => concatNumber(2))} radius="sm">2</Button>
            <Button onClick={handleButtonClick(() => concatNumber(3))} radius="sm">3</Button>
            <Button onClick={handleButtonClick(() => addOperator("+"))} radius="sm">+</Button>
          </div>
          <div className="flex gap-1 self-center">
            <Button onClick={handleButtonClick(() => toggleSign())} radius="sm">⁺⁄₋</Button>
            <Button onClick={handleButtonClick(() => concatNumber(0))} radius="sm">0</Button>
            <Button onClick={handleButtonClick(() => addDot())} radius="sm">.</Button>
            <Button
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
              onClick={handleButtonClick(() =>  evaluateExpression())}
              radius="sm"
            >
              =
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
