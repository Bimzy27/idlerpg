import {ISkillValue} from "../Skill";

export enum CombatType
{
    Melee,
    Ranged,
    Magic
}

export interface IAttackStyle
{
    name:string;
    attackInterval:number;
    expPerHit:ISkillValue[];
}