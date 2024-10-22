import "./App.css";
import BasicCalculator from "./components/BasicCalculator.tsx";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import DateCalculator from "./components/DateCalculator.tsx";

function App() {
  const [calc, setCalc] = useState<Boolean>(true);
  const dropdownRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="app-container">
      <Dropdown onOpenChange={() => dropdownRef.current?.blur()}>
        <DropdownTrigger>
          <Button
            ref={dropdownRef}
            isIconOnly
            variant="bordered"
            className="text-xl"
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem onClick={() => setCalc(true)}>Basic Calculator</DropdownItem>
          <DropdownItem onClick={() => setCalc(false)} className="text-danger" color="danger">
            Date Calculator
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {calc ? <BasicCalculator /> : <DateCalculator />}
    </div>
  );
}

export default App;
