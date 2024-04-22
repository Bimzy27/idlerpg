import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";
import {IEnemy} from "../models/combat/Enemy";
import enemyBuilder, {getEnemyId} from "../data/EnemyBuilder";
import {getHitpoints} from "../models/combat/CombatStats";
import {createStore} from "solid-js/store";
import {IItemAmount} from "../models/Item";
import useInventory, {InventoryData} from "./InventoryContext";
import {IAttackStyle} from "../models/combat/AttackStyle";
import {ActiveTaskData} from "./ActiveTaskContext";
import taskBuilder from "../data/tasks/TaskBuilder";
import usePlayer, {PlayerData} from "./PlayerContext";

export type CombatDamage = {died:boolean, damage:number}
export type CombatData = {
    enemy:Accessor<IEnemy>,
    setEnemy:(enemy:IEnemy, taskData:ActiveTaskData)=>void,
    attackStyle:Accessor<IAttackStyle>,
    setAttackStyle:(attackStyle:IAttackStyle)=>void,
    curEnemyHealth:Accessor<number>,
    loseEnemyHealth:(health:number)=>CombatDamage,
    loot:IItemAmount[],
    addLoot:(lootItems:IItemAmount[])=>void,
    lootAll:()=>void};

export const CombatContext = createContext<CombatData>();

interface ICombatProps {
    children?: JSX.Element; // Children elements
}

export function CombatProvider(props:ICombatProps) {
    const [activeEnemy, setActiveEnemy] = createSignal(enemyBuilder['none']);
    const [curHealth, setCurHealth] = createSignal<number>(0);
    const [attackStyle, setAttackStyle] = createSignal<IAttackStyle>({
        name: 'Stab',
        attackInterval: 1.5,
        expPerHit: [{ id: 'attack', exp: 2}, { id: 'hitpoints', exp: 0.5}]
    });
    const [loot, setLoot] = createStore<IItemAmount[]>([]);
    const inventory = useInventory() as InventoryData;
    const player = usePlayer() as PlayerData;

    const combat:CombatData = {
        enemy: activeEnemy,
        setEnemy: (enemy:IEnemy, taskData:ActiveTaskData)=>{

            if (getEnemyId(enemy) !== 'none')
            {
                if (player.curHealth() === 0)
                {
                    return;
                }
                taskData.setTask(taskBuilder['none']);
            }
            setActiveEnemy(enemy);
            setCurHealth(getHitpoints(activeEnemy().combatStats))
        },
        attackStyle:attackStyle,
        setAttackStyle:(attackStyle:IAttackStyle)=>
        {
            setAttackStyle(attackStyle);
        },
        curEnemyHealth:curHealth,
        loseEnemyHealth:(damage:number)=>{
            damage = Math.floor(damage);
            const finalDamage = damage > curHealth() ? curHealth() : damage;
            const newHealth = Math.max(0, curHealth() - finalDamage);
            setCurHealth(Math.floor(newHealth));
            return { died: newHealth <= 0 && finalDamage > 0, damage: finalDamage };
        },
        loot: loot,
        addLoot: (lootItems:IItemAmount[])=>
        {
            setLoot([...loot, ...lootItems]);
        },
        lootAll:()=>
        {
            inventory.addItems(loot);
            setLoot([])
        }
    };

    return (
        <CombatContext.Provider value={combat}>
            {props.children}
        </CombatContext.Provider>
    );
}

export default function useCombat() { return useContext(CombatContext) }