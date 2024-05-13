import IId from "./Id";

export interface ISkill
{
    name: string
    color: string
}

export interface ISkillValue extends IId
{
    exp:number
}

export function getLevel(skillValue:ISkillValue): number {
    let level:number = 0;
    let exp:number = 0;

    while (exp <= skillValue.exp && level < levelExpRequirements.length)
    {
        level++;
        exp += levelExpRequirements[level];
    }
    return level;
}

export function getMaxLevel(): number {
    return levelExpRequirements.length;
}

export function getReqLevelXp(skillValue:ISkillValue): number {
    let level = getLevel(skillValue);
    if (level < levelExpRequirements.length)
        return levelExpRequirements[level];
    return -1;
}

export function getCurLevelXp(skillValue:ISkillValue): number {
    let level:number = 1;
    let exp:number = skillValue.exp;

    while (exp >= levelExpRequirements[level - 1] && level < levelExpRequirements.length)
    {
        exp -= levelExpRequirements[level - 1];
        level++;
    }
    return exp;
}

export function getExpFromLevel(level:number):number
{
    let exp = 0;
    for (let i = 0; i < level; i++) {
        exp += levelExpRequirements[i];
    }
    return exp;
}

const levelExpRequirements: number[] =
    [
        0,
        83,
        91,
        102,
        112,
        124,
        138,
        151,
        168,
        185,
        204,
        226,
        249,
        274,
        304,
        335,
        369,
        408,
        450,
        497,
        548,
        606,
        667,
        737,
        814,
        898,
        990,
        1094,
        1207,
        1332,
        1470,
        1623,
        1791,
        1977,
        2182,
        2409,
        2658,
        2935,
        3240,
        3576,
        3947,
        4358,
        4810,
        5310,
        5863,
        6471,
        7144,
        7887,
        8707,
        9612,
        10612,
        11715,
        12934,
        14278,
        15764,
        17404,
        19214,
        21212,
        23420,
        25856,
        28546,
        31516,
        34795,
        38416,
        42413,
        46826,
        51699,
        57079,
        63019,
        69576,
        76818,
        84812,
        93638,
        103383,
        114143,
        126022,
        139138,
        153619,
        169608,
        187260,
        206750,
        228269,
        252027,
        278259,
        307221,
        339198,
        374502,
        413482,
        456519,
        504037,
        556499,
        614422,
        678376,
        748985,
        826944,
        913019,
        1008052,
        1112977,
        1228825,/*
        1356729,
        1497949,
        1653867,
        1826016,
        2016081,
        2225933,
        2457626,
        2713437,
        2995874,
        3307711,
        3652007,
        4032140,
        4451840,
        4915228,
        5426849,
        5991725,
        6615397,
        7303988,
        8064254,
        8903655,
        9830430*/
    ];