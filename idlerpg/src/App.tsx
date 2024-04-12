import type { Component } from 'solid-js';

import GameView from "./views/GameView";
import ContextProvider from "./contexts/ContextProvider";

const App: Component = () => {

    return (
        <ContextProvider>
            <GameView/>
        </ContextProvider>
    );
};

export default App;

