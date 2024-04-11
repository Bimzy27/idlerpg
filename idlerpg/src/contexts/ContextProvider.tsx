import {GameViewProvider} from "./GameViewContext";
import {InventoryProvider} from "./InventoryContext";
import {ActiveTaskProvider} from "./ActiveTaskContext";
import {JSX} from "solid-js";
import useSkills, {SkillProvider} from "./SkillsContext";

interface ContextProviderProps {
    children?: JSX.Element;
}

export function ContextProvider(props:ContextProviderProps) {
    return (
        <GameViewProvider>
            <SkillProvider>
                <InventoryProvider>
                    <ActiveTaskProvider>
                            {props.children}
                    </ActiveTaskProvider>
                </InventoryProvider>
            </SkillProvider>
        </GameViewProvider>
    );
}

export default ContextProvider;