import IId from "./Id";
import {IAttackStats, ICombatStats, IDefenseStats} from "./combat/CombatStats";
import {AttackType} from "./combat/AttackStyle";
import {IRequirement} from "./Requirement";

export interface IItem
{
    name:string;
    value:number
}

export enum EquippableSlot
{
    MainHand,
    OffHand,
    Head,
    Torso,
    Legs,
    Feet,
    Hands,
    Ring,
    Neck,
    Cape,
    Ammo,
}

export interface IEquippableItem extends IItem
{
    slot:EquippableSlot;
    requirements?:IRequirement[];
    attackStats?:IAttackStats;
    defenseStats?:IDefenseStats;
}

export interface IWeapon extends IEquippableItem
{
    attackSpeed:number;
    attackType:AttackType;
    isTwoHanded:boolean;
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