import React from "react";
import { Button } from "@nextui-org/react";

interface CalcButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

const CalcButton = ({ onClick, children, className, onKeyDown }: CalcButtonProps) => {
  return (
    <Button
      className={`min-w-16 w-17 max-w-18 ${className || ""}`}
      onClick={(event) => {
        event.currentTarget.blur();
        onClick();
      }}
      onKeyDown={onKeyDown}
      radius="sm"
    >
      {children}
    </Button>
  );
};

export default CalcButton;
