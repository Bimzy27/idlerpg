import {JSX} from "solid-js";
import {GameViewProvider} from "./GameViewContext";
import {InventoryProvider} from "./InventoryContext";
import {ActiveTaskProvider} from "./ActiveTaskContext";
import {SkillProvider} from "./SkillsContext";
import {CombatProvider} from "./CombatContext";
import {EquipmentProvider} from "./EquipmentContext";
import {PlayerProvider} from "./PlayerContext";

interface ContextProviderProps {
    children?: JSX.Element;
}

export function ContextProvider(props:ContextProviderProps) {
    return (
        <GameViewProvider>
            <SkillProvider>
                <InventoryProvider>
                    <EquipmentProvider>
                        <PlayerProvider>
                            <ActiveTaskProvider>
                                <CombatProvider>
                                    {props.children}
                                </CombatProvider>
                            </ActiveTaskProvider>
                        </PlayerProvider>
                    </EquipmentProvider>
                </InventoryProvider>
            </SkillProvider>
        </GameViewProvider>
    );
}

export default ContextProvider;