import {ICombatStats} from "./CombatStats";
import {IItemAmount} from "../Item";
import {IDroptable} from "./Droptable";

export interface IEnemy
{
    name:string;
    combatStats:ICombatStats;
    attackInterval:number;
    guaranteedDrops?:IItemAmount[];
    potentialDrops?:IDroptable;
}