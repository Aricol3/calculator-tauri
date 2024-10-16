import "./App.css";
import { Button } from "@nextui-org/react";
import { getCurrentWindow } from "@tauri-apps/api/window";

function App() {
  const appWindow = getCurrentWindow();

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
        <h1>15</h1>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1 self-center">
            <Button radius="sm">%</Button>
            <Button radius="sm">CE</Button>
            <Button radius="sm">C</Button>
            <Button radius="sm">DEL</Button>
          </div>
          <div className="flex gap-1 self-center">
            <Button radius="sm">⅟ₓ</Button>
            <Button radius="sm">x²</Button>
            <Button radius="sm">√</Button>
            <Button radius="sm">÷</Button>
          </div>
          <div className="flex gap-1 self-center">
            <Button radius="sm">7</Button>
            <Button radius="sm">8</Button>
            <Button radius="sm">9</Button>
            <Button radius="sm">×</Button>
          </div>
          <div className="flex gap-1 self-center">
            <Button radius="sm">4</Button>
            <Button radius="sm">5</Button>
            <Button radius="sm">6</Button>
            <Button radius="sm">–</Button>
          </div>
          <div className="flex gap-1 self-center">
            <Button radius="sm">1</Button>
            <Button radius="sm">2</Button>
            <Button radius="sm">3</Button>
            <Button radius="sm">+</Button>
          </div>
          <div className="flex gap-1 self-center">
            <Button radius="sm">⁺⁄₋</Button>
            <Button radius="sm">0</Button>
            <Button radius="sm">.</Button>
            <Button radius="sm">=</Button>
          </div>
        </div>

      </div>

    </>
  );
}

export default App;
