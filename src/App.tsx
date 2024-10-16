import "./App.css";
import { Button, ButtonGroup } from "@nextui-org/react";

function App() {

  return (
    <>
      <div className="container flex flex-col gap-4">
        <ButtonGroup size="lg">
          <Button>7</Button>
          <Button>8</Button>
          <Button>9</Button>
        </ButtonGroup>
        <ButtonGroup size="lg">
          <Button>4</Button>
          <Button>5</Button>
          <Button>6</Button>
        </ButtonGroup>
        <ButtonGroup size="lg">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </ButtonGroup>
        <ButtonGroup size="lg">
          <Button>0</Button>
        </ButtonGroup>
      </div>
    </>
  );
}

export default App;
