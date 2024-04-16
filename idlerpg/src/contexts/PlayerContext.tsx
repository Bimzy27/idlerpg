import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";
import {addStats, getHitpoints, ICombatStats} from "../models/combat/CombatStats";
import useSkills, {SkillsData} from "./SkillsContext";
import useEquipment, {EquipmentData} from "./EquipmentContext";

export type PlayerData = {getPlayerStats:()=>ICombatStats, curHealth:Accessor<number>, loseHealth:(health:number)=>boolean, gainHealth:(health:number)=>void};

export const PlayerContext = createContext<PlayerData>();

interface PlayerProps {
    children?: JSX.Element; // Children elements
}

export function PlayerProvider(props:PlayerProps) {
    const skills = useSkills() as SkillsData;
    const equipment = useEquipment() as EquipmentData;

    const [curHealth, setCurHealth] = createSignal<number>(1);

    const myPlayer:PlayerData = {
        getPlayerStats:()=>{
            let stats:ICombatStats = {
                hitpoints: skills.getSkillLevel('hitpoints'),
                attack: skills.getSkillLevel('attack'),
                strength: skills.getSkillLevel('strength'),
                defense: skills.getSkillLevel('defense') };
            stats = addStats(stats, equipment.getCombatStats());
            console.log("Stats:  " + stats)
            return stats;
        },
        curHealth:curHealth,
        loseHealth:(health:number)=>{
            let newHealth = Math.max(0, curHealth() - health);
            newHealth = Math.floor(newHealth)
            setCurHealth(newHealth);
            return newHealth <= 0;
        },
        gainHealth:(health:number)=>{
            const newHealth = Math.min(getHitpoints(myPlayer.getPlayerStats()), curHealth() + health);
            setCurHealth(newHealth);
        },
    };

    return (
        <PlayerContext.Provider value={myPlayer}>
            {props.children}
        </PlayerContext.Provider>
    );
}

export default function usePlayer() { return useContext(PlayerContext) }