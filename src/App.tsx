import "./App.css";
import BasicCalculator from "./components/BasicCalculator.tsx";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import DateCalculator from "./components/DateCalculator.tsx";
import Settings from "./components/Settings.tsx";
import { SCREEN } from "./types.ts";

function App() {
  const [screen, setScreen] = useState<String>(SCREEN.BASIC_CALCULATOR);
  const dropdownRef = useRef<HTMLButtonElement | null>(null);

  const renderScreen = () => {
    switch (screen) {
      case SCREEN.BASIC_CALCULATOR:
        return <BasicCalculator />;
      case SCREEN.DATE_CALCULATOR:
        return <DateCalculator />;
      case SCREEN.SETTINGS:
        return <Settings />;
      default:
        return <BasicCalculator />;
    }
  };

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
          <DropdownItem onClick={() => setScreen(SCREEN.BASIC_CALCULATOR)}>Basic Calculator</DropdownItem>
          <DropdownItem onClick={() => setScreen(SCREEN.DATE_CALCULATOR)}>
            Date Calculator
          </DropdownItem>
          <DropdownItem onClick={() => setScreen(SCREEN.SETTINGS)} className="text-warning" color="warning">
            Settings
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {renderScreen()}
    </div>
  );
}

export default App;
