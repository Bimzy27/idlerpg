//https://oldschool.runescape.wiki/w/Damage_per_second/Melee

import {AttackStyle, AttackType} from "./AttackStyle";

export interface ICombatStats
{
    hitpoints:number
    attack:number
    strength:number
    defense:number
    ranged:number
    magic:number
    prayer?:number
}

export interface IAttackStats
{
    stabBonus?:number
    slashBonus?:number
    blockBonus?:number
    rangedBonus?:number
    magicBonus?:number

    meleeStrength?:number
    rangedStrength?:number
    magicStrength?:number
}

export interface IDefenseStats
{
    meleeDefense:number
    rangedDefense:number
    magicDefense:number
    damageReduction?:number
}

export function combineStats(stats1: ICombatStats | undefined, stats2: ICombatStats | undefined): ICombatStats {
    return {
        hitpoints: Math.floor((stats1?.hitpoints || 0) + (stats2?.hitpoints || 0)),
        attack: Math.floor((stats1?.attack || 0) + (stats2?.attack || 0)),
        strength: Math.floor((stats1?.strength || 0) + (stats2?.strength || 0)),
        defense: Math.floor((stats1?.defense || 0) + (stats2?.defense || 0)),
        ranged: Math.floor((stats1?.ranged || 0) + (stats2?.ranged || 0)),
        magic: Math.floor((stats1?.magic || 0) + (stats2?.magic || 0)),
        prayer: Math.floor((stats1?.prayer || 0) + (stats2?.prayer || 0)),
    };
}

export function combineAttackStats(stats1: IAttackStats | undefined, stats2: IAttackStats | undefined): IAttackStats {
    return {
        stabBonus: Math.floor((stats1?.stabBonus || 0) + (stats2?.stabBonus || 0)),
        slashBonus: Math.floor((stats1?.slashBonus || 0) + (stats2?.slashBonus || 0)),
        blockBonus: Math.floor((stats1?.blockBonus || 0) + (stats2?.blockBonus || 0)),
        meleeStrength: Math.floor((stats1?.meleeStrength || 0) + (stats2?.meleeStrength || 0)),
        rangedBonus: Math.floor((stats1?.rangedBonus || 0) + (stats2?.rangedBonus || 0)),
        rangedStrength: Math.floor((stats1?.rangedStrength || 0) + (stats2?.rangedStrength || 0)),
        magicBonus: Math.floor((stats1?.magicBonus || 0) + (stats2?.magicBonus || 0)),
        magicStrength: Math.floor((stats1?.magicStrength || 0) + (stats2?.magicStrength || 0)),
    };
}

export function combineDefenseStats(stats1: IDefenseStats | undefined, stats2: IDefenseStats | undefined): IDefenseStats {
    return {
        meleeDefense: Math.floor((stats1?.meleeDefense || 0) + (stats2?.meleeDefense || 0)),
        rangedDefense: Math.floor((stats1?.rangedDefense || 0) + (stats2?.rangedDefense || 0)),
        magicDefense: Math.floor((stats1?.magicDefense || 0) + (stats2?.magicDefense || 0)),
        damageReduction: Math.floor((stats1?.damageReduction || 0) + (stats2?.damageReduction || 0)),
    };
}

export function getCombatLevel(stats:ICombatStats):number
{
    const prayerLevel = stats.prayer ? stats.prayer : 0;
    const baseCombatLevel = 0.25 * (stats.defense + stats.hitpoints + (0.5 * prayerLevel));
    const meleeLevel = stats.attack + stats.strength;
    const rangedLevel = stats.ranged * 1.5;
    const magicLevel = stats.magic * 1.5;
    return Math.floor(baseCombatLevel + 0.325 * Math.max(meleeLevel, rangedLevel, magicLevel));
}

export function getAccuracyBonus(attackStyle:AttackStyle, attackStats:IAttackStats):number
{
    let accuracyBonus = 64;
    switch (attackStyle)
    {
        case AttackStyle.stab:
            accuracyBonus += attackStats.stabBonus ? attackStats.stabBonus : 0;
            break;
        case AttackStyle.slash:
            accuracyBonus += attackStats.slashBonus ? attackStats.slashBonus : 0;
            break;
        case AttackStyle.block:
            accuracyBonus += attackStats.blockBonus ? attackStats.blockBonus : 0;
            break;
        case AttackStyle.ranged:
            accuracyBonus += attackStats.rangedBonus ? attackStats.rangedBonus : 0;
            break;
        case AttackStyle.magic:
            accuracyBonus += attackStats.magicBonus ? attackStats.magicBonus : 0;
            break;
    }
    return accuracyBonus;
}

export function getAttackType(attackStyle:AttackStyle):AttackType
{
    switch (attackStyle)
    {
        default:
        case AttackStyle.stab:
        case AttackStyle.slash:
        case AttackStyle.block:
            return AttackType.Melee;
        case AttackStyle.ranged:
            return AttackType.Ranged;
        case AttackStyle.magic:
            return AttackType.Magic;
    }
}

export function getAccuracyRating(attackType:AttackType, stats:ICombatStats, accuracyBonus:number):number
{
    let skillLevel = 9;
    switch (attackType)
    {
        case AttackType.Melee:
            skillLevel += stats.attack;
            break;
        case AttackType.Ranged:
            skillLevel += stats.ranged;
            break;
        case AttackType.Magic:
            skillLevel += stats.magic;
            break;
    }

    let accuracyModifier = 0; //todo implement this
    return (skillLevel + 9) * (accuracyBonus + 64) * (1+(accuracyModifier/100));
}

export function getEvasionRating(attackType:AttackType, stats:ICombatStats, defenseStats:IDefenseStats):number
{
    const evasionModifier = 0; //todo implement evasion modifier

    switch (attackType)
    {
        default:
        case AttackType.Melee:
            const meleeDefense = defenseStats.meleeDefense;
            return (stats.defense + 9) * (meleeDefense + 64) * (1+(evasionModifier/100));
        case AttackType.Ranged:
            const rangedDefense = defenseStats.rangedDefense;
            return (stats.defense + 9) * (rangedDefense + 64) * (1+(evasionModifier/100));
        case AttackType.Magic:
            const effectiveLevel = (0.3*stats.defense) + (0.7*stats.magic);
            const magicDefense = defenseStats.magicDefense;
            return (effectiveLevel + 9) * (magicDefense + 64) * (1+(evasionModifier/100));
    }
}

export function getHitChance(attackType:AttackType, accuracyRating:number, opponentStats:ICombatStats, opponentDefenseStats:IDefenseStats):number
{
    const accuracy = accuracyRating;
    const evasion = getEvasionRating(attackType, opponentStats, opponentDefenseStats);
    let hitChance = 0;
    if (accuracy < evasion)
    {
        hitChance = (accuracy/(2*evasion))*100;
    }
    else
    {
        hitChance = (1 - (evasion/(2*accuracy)))*100;
    }
    return hitChance;
}

export function getMaxHit(attackType:AttackType, stats:ICombatStats, attackStats:IAttackStats):number
{
    let skillLevel = 0;
    let strengthBonus = 0;

    switch (attackType)
    {
        case AttackType.Melee:
            skillLevel = stats.strength;
            strengthBonus = attackStats.meleeStrength ? attackStats.meleeStrength : 0;
            break;
        case AttackType.Ranged:
            skillLevel = stats.ranged;
            strengthBonus = attackStats.rangedStrength ? attackStats.rangedStrength : 0;
            break;
        case AttackType.Magic:
            skillLevel = stats.magic;
            strengthBonus = attackStats.magicStrength ? attackStats.magicStrength : 0;
            break;
    }

    const baseMaxHit = 10 * (2.2 + (skillLevel/10) + (((skillLevel + 17) * strengthBonus)/640));
    const percentMaxHitModifier = 0; //todo implement max hit modifier
    const flatMaxHitModifier = 0; //todo implement flat max hit modifier
    return Math.floor(baseMaxHit*(1+(percentMaxHitModifier/100))+flatMaxHitModifier);
}

export function getMinHit():number
{
    return 1; //TODO implement min hit
}

export function getHitpoints(stats:ICombatStats):number
{
    return stats.hitpoints * 10;
}