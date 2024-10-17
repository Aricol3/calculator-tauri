import "./App.css";
import BasicCalculator from "./components/BasicCalculator.tsx";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [calc, setCalc] = useState<Boolean>(false);
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
            <FontAwesomeIcon icon={faBars}/>
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem onClick={()=>setCalc(true)}>1</DropdownItem>
          <DropdownItem onClick={()=>setCalc(false)} className="text-danger" color="danger">
            2
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {calc? <div>???</div>:<BasicCalculator />}
    </div>
  );
}

export default App;
