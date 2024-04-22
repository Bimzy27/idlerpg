import {JSX} from "solid-js";
import {GameViewProvider} from "./GameViewContext";
import {InventoryProvider} from "./InventoryContext";
import {ActiveTaskProvider} from "./ActiveTaskContext";
import {SkillProvider} from "./SkillsContext";
import {CombatProvider} from "./CombatContext";
import {EquipmentProvider} from "./EquipmentContext";
import {PlayerProvider} from "./PlayerContext";
import {ContextLoader} from "./ContextLoader";

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
                            <CombatProvider>
                                <ActiveTaskProvider>
                                    <ContextLoader>
                                        {props.children}
                                    </ContextLoader>
                                </ActiveTaskProvider>
                            </CombatProvider>
                        </PlayerProvider>
                    </EquipmentProvider>
                </InventoryProvider>
            </SkillProvider>
        </GameViewProvider>
    );
}

export default ContextProvider;