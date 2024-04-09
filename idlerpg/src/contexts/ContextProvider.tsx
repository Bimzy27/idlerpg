import {GameViewProvider} from "./GameViewContext";
import {InventoryProvider} from "./InventoryContext";
import {ActiveTaskProvider} from "./ActiveTaskContext";
import {JSX} from "solid-js";

interface ContextProviderProps {
    children?: JSX.Element; // Children elements
}

export function ContextProvider(props:ContextProviderProps) {

    return (
        <GameViewProvider>
            <ActiveTaskProvider>
                <InventoryProvider>
                    {props.children}
                </InventoryProvider>
            </ActiveTaskProvider>
        </GameViewProvider>
    );
}

export default ContextProvider;