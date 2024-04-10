import {GameViewProvider} from "./GameViewContext";
import {InventoryProvider} from "./InventoryContext";
import {ActiveTaskProvider} from "./ActiveTaskContext";
import {JSX} from "solid-js";
import {SkillProvider} from "./SkillsContext";

interface ContextProviderProps {
    children?: JSX.Element; // Children elements
}

export function ContextProvider(props:ContextProviderProps) {

    return (
        <GameViewProvider>
            <ActiveTaskProvider>
                <InventoryProvider>
                    <SkillProvider>
                        {props.children}
                    </SkillProvider>
                </InventoryProvider>
            </ActiveTaskProvider>
        </GameViewProvider>
    );
}

export default ContextProvider;