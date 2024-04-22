import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";
import {addStats, getHitpoints, ICombatStats} from "../models/combat/CombatStats";
import useSkills, {SkillsData} from "./SkillsContext";
import useEquipment, {EquipmentData} from "./EquipmentContext";
import {CombatDamage} from "./CombatContext";

export type PlayerData = {
    getPlayerStats:()=>ICombatStats,
    curHealth:Accessor<number>,
    loseHealth:(damage:number)=>CombatDamage,
    gainHealth:(health:number)=>void,
    setInitialPlayerStats:()=>void,
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

    const skills = useSkills() as SkillsData;
    const equipment = useEquipment() as EquipmentData;
    const [curHealth, setCurHealth] = createSignal<number>(0);

    const myPlayer:PlayerData = {
        getPlayerStats:getPlayerStats_Internal,
        curHealth:curHealth,
        loseHealth:(damage:number)=>{
            damage = Math.floor(damage);
            const finalDamage = damage > curHealth() ? curHealth() : damage;
            const newHealth = Math.max(0, curHealth() - finalDamage);
            setCurHealth(Math.floor(newHealth));
            return { died: newHealth <= 0 && finalDamage > 0, damage: finalDamage };
        },
        gainHealth:(health:number)=>{
            const newHealth = Math.min(getHitpoints(myPlayer.getPlayerStats()), curHealth() + health);
            setCurHealth(newHealth);
        },
        setInitialPlayerStats:()=>
        {
            myPlayer.gainHealth(myPlayer.getPlayerStats().hitpoints);
        }
    };

    return (
        <PlayerContext.Provider value={myPlayer}>
            {props.children}
        </PlayerContext.Provider>
    );
}

export default function usePlayer() { return useContext(PlayerContext) }