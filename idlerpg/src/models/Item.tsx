import IId from "./Id";
import {ICombatStats} from "./combat/CombatStats";

export interface IItem
{
    name:string;
    value:number
}

export enum EquippableSlot
{
    MainHand,
    OffHand
}

export interface IEquippableItem extends IItem
{
    slot:EquippableSlot[]
    combatStats:ICombatStats;
}

export interface IEquipSlot
{
    slot:EquippableSlot;
    itemId:string;
}

export interface IItemAmount extends IId
{
    amount:number;
}