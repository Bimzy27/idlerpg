//https://oldschool.runescape.wiki/w/Damage_per_second/Melee

import MathUtil from "../../common/MathUtil";

export interface ICombatStats
{
    hitpoints:number
    attack:number
    strength:number
    defense:number
    ranged:number
    magic:number
    prayer:number
}

export function addStats(stats1: ICombatStats | undefined, stats2: ICombatStats | undefined): ICombatStats {
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

export function getCombatLevel(stats:ICombatStats):number
{
    //TODO implement combat level
    return -1;
}

export function getHitpoints(stats:ICombatStats):number
{
    return stats.hitpoints;
}

export function getStrength(stats:ICombatStats):number
{
    return stats.strength + 8;
}

export function getMaxHit(stats:ICombatStats):number
{
    return Math.floor(((getStrength(stats) * 64) + 320) / 640);
}

export function getAttack(stats:ICombatStats):number
{
    return stats.attack + 8;
}

function getAttackRoll(stats:ICombatStats, targetStats:ICombatStats):number
{
    return getAttack(stats) * 64; //TODO add target gear bonus as per doco
}

export function getDefense(stats:ICombatStats):number
{
    return stats.defense + 8;
}

function getDefenseRoll(stats:ICombatStats, targetStats:ICombatStats):number
{
    return getDefense(stats) * 64; //TODO add target gear bonus as per doco
}

export function getHitChance(stats:ICombatStats, targetStats:ICombatStats):number
{
    const atkRoll:number = getAttackRoll(stats, targetStats);
    const defRoll:number = getDefenseRoll(targetStats, stats);

    return MathUtil.clamp(atkRoll / (2*(defRoll + 1)), 0, 1);
}