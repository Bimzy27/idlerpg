import {GameViewProvider} from "./GameViewContext";
import {InventoryProvider} from "./InventoryContext";
import {ActiveTaskProvider} from "./ActiveTaskContext";
import {JSX} from "solid-js";
import useSkills, {SkillProvider} from "./SkillsContext";

interface ContextProviderProps {
    children?: JSX.Element; // Children elements
}

export function ContextProvider(props:ContextProviderProps) {
    return (
        <GameViewProvider>
            <SkillProvider>
                <ActiveTaskProvider>
                    <InventoryProvider>
                            {props.children}
                    </InventoryProvider>
                </ActiveTaskProvider>
            </SkillProvider>
        </GameViewProvider>
    );
}

export default ContextProvider;