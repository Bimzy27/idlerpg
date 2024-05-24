import {ICombatStats, IDefenseStats} from "./CombatStats";
import {IItemAmount} from "../Item";
import {IDroptable} from "./Droptable";
import {AttackType} from "./AttackStyle";
import IId from "../Id";

export interface IEnemy
{
    name:string;
    attackType:AttackType,
    accuracyRating:number;
    maxHit:number;
    combatStats:ICombatStats;
    defenseStats:IDefenseStats;
    attackInterval:number;
    guaranteedDrops?:IItemAmount[];
    potentialDrops?:IDroptable;
}

export interface IEnemyAmount extends IId
{
    amount:number
}