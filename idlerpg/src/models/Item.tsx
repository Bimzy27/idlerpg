import IId from "./Id";
import {ICombatStats} from "./combat/CombatStats";
import {CombatType} from "./combat/AttackStyle";
import {IRequirement} from "./Requirement";

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
    requirements:IRequirement[];
}

export interface IWeapon extends IEquippableItem
{
    combatType:CombatType;
}

export interface IFood extends IItem
{
    healing:number
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