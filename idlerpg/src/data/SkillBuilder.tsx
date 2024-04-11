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
        },
    'strength':
        {
            name:'Strength',
        },
    'defense':
        {
            name:'Defense',
        },
    'ranged':
        {
            name:'Ranged',
        },
    'magic':
        {
            name:'Magic',
        },
    'health':
        {
            name:'Health',
        },
    'prayer':
        {
            name:'Prayer',
        },
    'mining':
        {
            name:'Mining',
        },
    'smithing':
        {
            name:'Smithing',
        },
    'fishing':
        {
            name:'Fishing',
        },
    'cooking':
        {
            name:'Cooking',
        },
    'firemaking':
        {
            name:'Firemaking',
        },
    'woodcutting':
        {
            name:'Woodcutting',
        },
    'fletching':
        {
            name:'Fletching',
        },
    'runecrafting':
        {
            name:'Runecrafting',
        },
    'crafting':
        {
            name:'Crafting',
        },
};


export default skillBuilder;