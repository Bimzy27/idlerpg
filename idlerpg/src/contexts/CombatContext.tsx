import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";
import {IEnemy} from "../models/combat/Enemy";
import enemyBuilder from "../data/EnemyBuilder";

export type CombatData = {enemy:Accessor<IEnemy>, setEnemy:(enemy:IEnemy)=>void};

export const CombatContext = createContext<CombatData>();

interface ICombatProps {
    children?: JSX.Element; // Children elements
}

export function CombatProvider(props:ICombatProps) {
    const [activeEnemy, setActiveEnemy] = createSignal(enemyBuilder['none']);

    const combat:CombatData = {
        enemy: activeEnemy,
        setEnemy: (enemy:IEnemy)=>{
            setActiveEnemy(enemy);
        },
    };

    return (
        <CombatContext.Provider value={combat}>
            {props.children}
        </CombatContext.Provider>
    );
}

export default function useCombat() { return useContext(CombatContext) }