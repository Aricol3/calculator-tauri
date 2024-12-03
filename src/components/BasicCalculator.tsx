import "./BasicCalculator.css";
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window";
import { useState, useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api/core";
import CalcButton from "../common/CalcButton.tsx";

const BasicCalculator = () => {
  const [output, setOutput] = useState<string>("0");
  const outputRef = useRef<HTMLHeadingElement | null>(null);
  const outputValueRef = useRef(output);

  useEffect(() => {
    outputValueRef.current = output;
  }, [output]);

  useEffect(() => {
    getCurrentWindow().setSize(new LogicalSize(280, 420));

    const handleKeyDown = async (event: KeyboardEvent) => {
      const { key } = event;

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

  const evaluateExpression = async () => {
    try {
      let expressionToEvaluate = outputValueRef.current;
      const lastChar = expressionToEvaluate.slice(-1);
      if ("+-*/%".includes(lastChar)) {
        expressionToEvaluate = expressionToEvaluate.slice(0, -1);
      }
      const result: string = await invoke("evaluate_expression", { expression: expressionToEvaluate });
      setOutput(result.toString());
    } catch (error) {
      setOutput("Error");
    }
  };

  const clearOutput = () => setOutput("0");
  const concatNumber = (number: number) => setOutput(prev => prev === "0" || prev === "Error" ? number.toString() : prev + number.toString());
  const addDot = () => setOutput(prev => prev.includes(".") ? prev : prev + ".");
  const removeLast = () => setOutput(prev => prev.length > 1 && prev !== "Error" ? prev.slice(0, -1) : "0");
  const squareRoot = () => setOutput(prev => prev === "Error" ? "0" : `sqrt(${/\W$/.test(prev) ? prev.slice(0, -1) : prev})`);
  const makeFraction = () => setOutput(prev => prev === "Error" ? "0" : `1/(${/\W$/.test(prev) ? prev.slice(0, -1) : prev})`);
  const toggleSign = () => setOutput(prev => prev.startsWith("-") ? prev.slice(1) : "-" + prev);
  const addOperator = (operator: string) => setOutput(prev => {
    if (prev === "Error") return "0";

    if (operator === "-" && prev === "0") {
      return "-";
    }

    return (/\W$/.test(prev) ? prev.slice(0, -1) : prev) + operator;
  });

  const getFontSize = () => {
    return output.length > 10 ? "1.5em" : "2em";
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollLeft = outputRef.current.scrollWidth;
    }
  }, [output]);

  return (
    <div className="basic-calculator-container pt-4">
      <h1
        ref={outputRef}
        className="overflow-x-auto whitespace-nowrap text-right text-2xl max-w-full"
        style={{ fontSize: getFontSize() }}
      >
        {output}
      </h1>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 self-center">
          <CalcButton onClick={() => addOperator("%")}>%</CalcButton>
          <CalcButton onClick={clearOutput}>CE</CalcButton>
          <CalcButton onClick={clearOutput}>C</CalcButton>
          <CalcButton onClick={removeLast}>DEL</CalcButton>
        </div>
        <div className="flex gap-1 self-center">
          <CalcButton onClick={makeFraction}>⅟ₓ</CalcButton>
          <CalcButton onClick={() => addOperator("^2")}>x²</CalcButton>
          <CalcButton onClick={squareRoot}>√</CalcButton>
          <CalcButton onClick={() => addOperator("/")}>÷</CalcButton>
        </div>
        <div className="flex gap-1 self-center">
          <CalcButton onClick={() => concatNumber(7)}>7</CalcButton>
          <CalcButton onClick={() => concatNumber(8)}>8</CalcButton>
          <CalcButton onClick={() => concatNumber(9)}>9</CalcButton>
          <CalcButton onClick={() => addOperator("*")}>×</CalcButton>
        </div>
        <div className="flex gap-1 self-center">
          <CalcButton onClick={() => concatNumber(4)}>4</CalcButton>
          <CalcButton onClick={() => concatNumber(5)}>5</CalcButton>
          <CalcButton onClick={() => concatNumber(6)}>6</CalcButton>
          <CalcButton onClick={() => addOperator("-")}>–</CalcButton>
        </div>
        <div className="flex gap-1 self-center">
          <CalcButton onClick={() => concatNumber(1)}>1</CalcButton>
          <CalcButton onClick={() => concatNumber(2)}>2</CalcButton>
          <CalcButton onClick={() => concatNumber(3)}>3</CalcButton>
          <CalcButton onClick={() => addOperator("+")}>+</CalcButton>
        </div>
        <div className="flex gap-1 self-center">
          <CalcButton onClick={toggleSign}>⁺⁄₋</CalcButton>
          <CalcButton onClick={() => concatNumber(0)}>0</CalcButton>
          <CalcButton onClick={addDot}>.</CalcButton>
          <CalcButton onClick={evaluateExpression}
                      className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
            =
          </CalcButton>
        </div>
      </div>
    </div>
  );
};

export default BasicCalculator;
