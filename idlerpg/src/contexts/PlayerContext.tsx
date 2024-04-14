import {ISkillValue} from "../models/Skill";
import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";
import {IPlayer} from "../models/combat/Player";

export type PlayerData = {player:Accessor<IPlayer>, curHealth:Accessor<number>};

export const PlayerContext = createContext<PlayerData>();

const defaultPlayer:IPlayer = {
    combatStats:
        {
            hitpoints: 10,
            attack: 1,
            strength: 1,
            defense: 1,
        }
}

interface PlayerProps {
    children?: JSX.Element; // Children elements
}

export function PlayerProvider(props:PlayerProps) {
    const [player, setPlayer] = createSignal<IPlayer>(defaultPlayer);
    const [curHealth, setCurHealth] = createSignal<number>(0);

    const myPlayer:PlayerData = {
        player:player,
        curHealth:curHealth
    };

    return (
        <PlayerContext.Provider value={myPlayer}>
            {props.children}
        </PlayerContext.Provider>
    );
}

export default function useSkills() { return useContext(PlayerContext) }