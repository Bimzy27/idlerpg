import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";
import {IEnemy} from "../models/combat/Enemy";
import enemyBuilder from "../data/EnemyBuilder";
import {getHitpoints} from "../models/combat/CombatStats";

export type EnemyDamage = {died:boolean, damage:number}
export type CombatData = {enemy:Accessor<IEnemy>, setEnemy:(enemy:IEnemy)=>void, curEnemyHealth:Accessor<number>, loseEnemyHealth:(health:number)=>EnemyDamage};

export const CombatContext = createContext<CombatData>();

interface ICombatProps {
    children?: JSX.Element; // Children elements
}

export function CombatProvider(props:ICombatProps) {
    const [activeEnemy, setActiveEnemy] = createSignal(enemyBuilder['none']);
    const [curHealth, setCurHealth] = createSignal<number>(0);

    const combat:CombatData = {
        enemy: activeEnemy,
        setEnemy: (enemy:IEnemy)=>{
            setActiveEnemy(enemy);
            setCurHealth(getHitpoints(activeEnemy().combatStats))
        },
        curEnemyHealth:curHealth,
        loseEnemyHealth:(damage:number)=>{
            console.log('DamagePre: ' + damage);
            damage = Math.floor(damage);
            console.log('DamagePost: ' + damage);
            const finalDamage = damage > curHealth() ? curHealth() : damage;
            const newHealth = Math.max(0, curHealth() - finalDamage);
            setCurHealth(Math.floor(newHealth));
            return { died: newHealth <= 0, damage: finalDamage };
        },
    };

    return (
        <CombatContext.Provider value={combat}>
            {props.children}
        </CombatContext.Provider>
    );
}

export default function useCombat() { return useContext(CombatContext) }