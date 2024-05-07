import {ISkillValue} from "../Skill";

export enum AttackType
{
    Melee,
    Ranged,
    Magic
}

export function getAttackType(attackType:AttackType):string
{
    switch (attackType)
    {
        default:
        case 0:
            return 'Melee';
        case 1:
            return 'Ranged';
        case 2:
            return 'Magic';
    }
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