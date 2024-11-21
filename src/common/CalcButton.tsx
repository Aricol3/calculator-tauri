import React from "react";
import { Button } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { IRootState } from "../store.ts";

interface CalcButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

const CalcButton = ({ onClick, children, className, onKeyDown }: CalcButtonProps) => {
  const settings = useSelector((state: IRootState) => state.settings);

  return (
    <Button
      className={`min-w-16 w-17 max-w-18 ${className || ""}`}
      onClick={(event) => {
        event.currentTarget.blur();
        onClick();
      }}
      onKeyDown={onKeyDown}
      radius="sm"
      color={settings.buttonColor}
      variant={settings.buttonVariant}
    >
      {children}
    </Button>
  );
};

export default CalcButton;
