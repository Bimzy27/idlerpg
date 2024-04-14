//https://oldschool.runescape.wiki/w/Damage_per_second/Melee

export interface ICombatStats
{
    hitpoints:number
    attack:number
    strength:number
    defense:number
}

function getStrength(stats:ICombatStats):number
{
    return stats.strength + 8
}

function getMaxHit(stats:ICombatStats):number
{
    return ((getStrength(stats) * 64) + 320) / 640
}

function getAttack(stats:ICombatStats):number
{
    return stats.attack + 8
}

function getAttackRoll(stats:ICombatStats, targetStats:ICombatStats):number
{
    return getAttack(stats) * 64 //TODO add target gear bonus as per doco
}

function getDefense(stats:ICombatStats):number
{
    return stats.defense + 8
}

function getDefenseRoll(stats:ICombatStats, targetStats:ICombatStats):number
{
    return getDefense(stats) * 64 //TODO add target gear bonus as per doco
}

export function getHitChance(stats:ICombatStats, targetStats:ICombatStats):number
{
    const atkRoll:number = getAttackRoll(stats, targetStats);
    const defRoll:number = getDefenseRoll(targetStats, stats);

    return atkRoll / (2*(defRoll + 1));
}