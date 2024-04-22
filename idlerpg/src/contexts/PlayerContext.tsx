import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";
import {addStats, getHitpoints, ICombatStats} from "../models/combat/CombatStats";
import useSkills, {SkillsData} from "./SkillsContext";
import useEquipment, {EquipmentData} from "./EquipmentContext";
import {CombatDamage} from "./CombatContext";
import itemBuilder from "../data/items/ItemBuilder";
import {IFood} from "../models/Item";
import useInventory, {InventoryData} from "./InventoryContext";

export type PlayerData = {
    setInitialPlayerStats:()=>void,
    getPlayerStats:()=>ICombatStats,
    curHealth:Accessor<number>,
    loseHealth:(damage:number)=>CombatDamage,
    gainHealth:(health:number)=>void,
    food:Accessor<string>,
    setFood:(foodId:string)=>void,
    eatFood:()=>void,
};

export const PlayerContext = createContext<PlayerData>();

interface PlayerProps {
    children?: JSX.Element; // Children elements
}

export function PlayerProvider(props:PlayerProps) {

    function getPlayerStats_Internal():ICombatStats
    {
        let stats:ICombatStats = {
            hitpoints: skills.getSkillLevel('hitpoints'),
            attack: skills.getSkillLevel('attack'),
            strength: skills.getSkillLevel('strength'),
            defense: skills.getSkillLevel('defense'),
            ranged: skills.getSkillLevel('ranged'),
            magic: skills.getSkillLevel('magic'),
            prayer: skills.getSkillLevel('prayer'), };
        stats = addStats(stats, equipment.getCombatStats());
        return stats;
    }

    const [food, setFood] = createSignal('');
    const [curHealth, setCurHealth] = createSignal<number>(0);

    const skills = useSkills() as SkillsData;
    const equipment = useEquipment() as EquipmentData;
    const inventory = useInventory() as InventoryData;

    const myPlayer:PlayerData = {
        setInitialPlayerStats:()=>
        {
            myPlayer.gainHealth(myPlayer.getPlayerStats().hitpoints);
        },
        getPlayerStats:getPlayerStats_Internal,
        curHealth:curHealth,
        loseHealth:(damage:number)=>{
            damage = Math.floor(damage);
            const finalDamage = damage > curHealth() ? curHealth() : damage;
            const newHealth = Math.max(0, curHealth() - finalDamage);

            setCurHealth(Math.floor(newHealth));

            if (curHealth() > 0 && curHealth() <= myPlayer.getPlayerStats().hitpoints * 0.3)
            {
                myPlayer.eatFood();
            }

            return { died: newHealth <= 0 && finalDamage > 0, damage: finalDamage };
        },
        gainHealth:(health:number)=>{
            const newHealth = Math.min(getHitpoints(myPlayer.getPlayerStats()), curHealth() + health);
            setCurHealth(newHealth);
        },
        food:food,
        setFood:(foodId:string)=>
        {
            const foodItem = { id: foodId, amount: 1 };
            if (foodId !== 'none' && inventory.hasItem(foodItem) && (itemBuilder[foodItem.id] as IFood).healing !== undefined)
            {
                setFood(foodId);
            }
            else
            {
                setFood(foodId);
            }
        },
        eatFood:()=>
        {
            const foodItem = { id: food(), amount: 1 };
            if (food() != 'none' && inventory.hasItem(foodItem) && (itemBuilder[foodItem.id] as IFood).healing !== undefined)
            {
                inventory.removeItem(foodItem);
                myPlayer.gainHealth((itemBuilder[foodItem.id] as IFood).healing);
                if (!inventory.hasItem(foodItem))
                {
                    myPlayer.setFood('none');
                }
            }
        },
    };

    return (
        <PlayerContext.Provider value={myPlayer}>
            {props.children}
        </PlayerContext.Provider>
    );
}

export default function usePlayer() { return useContext(PlayerContext) }