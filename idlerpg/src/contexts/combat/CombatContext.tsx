import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";
import {IEnemy} from "../../models/combat/Enemy";
import {createStore} from "solid-js/store";
import {IItemAmount} from "../../models/Item";
import useInventory, {InventoryData} from "../InventoryContext";
import {AttackStyle, IAttackStyle} from "../../models/combat/AttackStyle";
import {ActiveTaskData} from "../ActiveTaskContext";
import usePlayer, {PlayerData} from "../PlayerContext";
import {getHitpoints} from "../../models/combat/CombatStats";
import {enemyData, getEnemyId} from "../../loaders/EnemyLoader";
import {taskData} from "../../loaders/TaskLoader";
import MathUtil from "../../common/MathUtil";
import {EnemyDeathSubject} from "./EnemyDeath";

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
    lootAll:()=>void

    playerAttackProgress:Accessor<number>,
    setPlayerAttackProgress:(progress:number)=>void,
    playerAttackDuration:Accessor<number>,
    setPlayerAttackDuration:(duration:number)=>void,

    enemyAttackProgress:Accessor<number>,
    setEnemyAttackProgress:(progress:number)=>void,
    enemyAttackDuration:Accessor<number>,
    setEnemyAttackDuration:(duration:number)=>void,

    enemyDeathSubject:EnemyDeathSubject,
};

export const CombatContext = createContext<CombatData>();

interface ICombatProps {
    children?: JSX.Element; // Children elements
}

const enemyDeathSubject = new EnemyDeathSubject();

export function CombatProvider(props:ICombatProps) {
    const [activeEnemy, setActiveEnemy] = createSignal(enemyData['none']);
    const [curHealth, setCurHealth] = createSignal<number>(0);
    const [attackStyle, setAttackStyle] = createSignal<IAttackStyle>({
        attackStyle: AttackStyle.stab,
        expPerHit: [{ id: 'attack', exp: 2}, { id: 'hitpoints', exp: 0.5}]
    });
    const [loot, setLoot] = createStore<IItemAmount[]>([]);
    const [playerAttackProgress, setPlayerAttackProgress] = createSignal(0);
    const [playerAttackDuration, setPlayerAttackDuration] = createSignal(0);
    const [enemyAttackProgress, setEnemyAttackProgress] = createSignal(0);
    const [enemyAttackDuration, setEnemyAttackDuration] = createSignal(0);

    const inventory = useInventory() as InventoryData;
    const player = usePlayer() as PlayerData;

    console.log('Combat Provider Loaded.');

    const combat:CombatData = {
        enemy: activeEnemy,
        setEnemy: (enemy:IEnemy, tasksData:ActiveTaskData)=>{

            if (getEnemyId(enemy) !== 'none')
            {
                if (player.curHealth() === 0)
                {
                    return;
                }
                tasksData.setTask(taskData['none']);
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
            const died = newHealth <= 0 && finalDamage > 0;
            if (died)
            {
                combat.enemyDeathSubject.notifyEnemyDeath(getEnemyId(combat.enemy()))
            }
            return { died: died, damage: finalDamage };
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
        },

        playerAttackProgress:playerAttackProgress,
        setPlayerAttackProgress:(progress:number)=>{setPlayerAttackProgress(MathUtil.clamp(progress, 0, 100))},
        playerAttackDuration:playerAttackDuration,
        setPlayerAttackDuration:(duration:number)=>{setPlayerAttackDuration(duration)},

        enemyAttackProgress:enemyAttackProgress,
        setEnemyAttackProgress:(progress:number)=>{setEnemyAttackProgress(MathUtil.clamp(progress, 0, 100))},
        enemyAttackDuration:enemyAttackDuration,
        setEnemyAttackDuration:(duration:number)=>{setEnemyAttackDuration(duration)},

        enemyDeathSubject: enemyDeathSubject,
    };

    return (
        <CombatContext.Provider value={combat}>
            {props.children}
        </CombatContext.Provider>
    );
}

export default function useCombat() { return useContext(CombatContext) }