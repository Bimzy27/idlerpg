import type { Component } from 'solid-js';

import {ActiveTaskProvider} from "./contexts/ActiveTaskContext";
import {InventoryProvider} from "./contexts/InventoryContext";
import GameView from "./views/GameView";

const App: Component = () => {
  return (
      <ActiveTaskProvider>
          <InventoryProvider>
              <GameView/>
          </InventoryProvider>
      </ActiveTaskProvider>
  );
};

export default App;
