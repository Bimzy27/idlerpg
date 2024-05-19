import {JSX} from "solid-js";
import {GameViewProvider} from "./GameViewContext";
import {InventoryProvider} from "./InventoryContext";
import {ActiveTaskProvider} from "./ActiveTaskContext";
import {SkillProvider} from "./SkillsContext";
import {CombatProvider} from "./CombatContext";
import {EquipmentProvider} from "./EquipmentContext";
import {PlayerProvider} from "./PlayerContext";
import {ContextLoader} from "./ContextLoader";
import {ContextSaver} from "./ContextSaver";
import {MapProvider} from "./MapContext";
import {QuestProvider} from "./QuestContext";

interface IContextProviderProps {
    children?: JSX.Element;
}

export function ContextProvider(props:IContextProviderProps) {
    return (
        <GameViewProvider>
            <MapProvider>
                <SkillProvider>
                    <InventoryProvider>
                        <EquipmentProvider>
                            <QuestProvider>
                                <PlayerProvider>
                                    <CombatProvider>
                                        <ActiveTaskProvider>
                                            <ContextLoader>
                                                <ContextSaver>
                                                    {props.children}
                                                </ContextSaver>
                                            </ContextLoader>
                                        </ActiveTaskProvider>
                                    </CombatProvider>
                                </PlayerProvider>
                            </QuestProvider>
                        </EquipmentProvider>
                    </InventoryProvider>
                </SkillProvider>
            </MapProvider>
        </GameViewProvider>
    );
}

export default ContextProvider;