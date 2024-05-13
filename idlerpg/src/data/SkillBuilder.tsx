import {ISkill} from "../models/Skill";

interface ISkillBuilder
{
    [id:string]:ISkill;
}

const skillBuilder:ISkillBuilder =
{
    'attack':
        {
            name:'Attack',
            color: "#FF0000"
        },
    'strength':
        {
            name:'Strength',
            color: "#FF0000"
        },
    'defense':
        {
            name:'Defense',
            color: "#FF0000"
        },
    'ranged':
        {
            name:'Ranged',
            color: "#FF0000"
        },
    'magic':
        {
            name:'Magic',
            color: "#FF0000"
        },
    'hitpoints':
        {
            name:'Hitpoints',
            color: "#FF0000"
        },
    'prayer':
        {
            name:'Prayer',
            color: "#FF0000"
        },
    'mining':
        {
            name:'Mining',
            color: "#948479"
        },
    'smithing':
        {
            name:'Smithing',
            color: "#68676e"
        },
    'fishing':
        {
            name:'Fishing',
            color: "#91ceef"
        },
    'cooking':
        {
            name:'Cooking',
            color: "#c0b5b7"
        },
    'firemaking':
        {
            name:'Firemaking',
            color: "#b36524"
        },
    'woodcutting':
        {
            name:'Woodcutting',
            color: "#358e12"
        },
    'fletching':
        {
            name:'Fletching',
            color: "#e67474"
        },
    'runecrafting':
        {
            name:'Runecrafting',
            color: "#d0b1a5"
        },
    'crafting':
        {
            name:'Crafting',
            color: "#93754f"
        },
};

export function isSkillId(skillId:string):boolean
{
    for (const curSkillId in skillBuilder) {
        if (skillId === curSkillId)
        {
            return true;
        }
    }
    return false;
}

export default skillBuilder;