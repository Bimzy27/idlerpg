import {ISkillValue} from "../Skill";

export enum AttackType
{
    Melee,
    Ranged,
    Magic
}

export enum AttackStyle
{
    stab='stab',
    slash='slash',
    block='block',
    ranged='ranged',
    magic='magic'
}

export interface IAttackStyle
{
    attackStyle:AttackStyle;
    expPerHit:ISkillValue[];
}