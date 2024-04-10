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
    'prayer':
        {
            name:'Prayer',
        },
    'magic':
        {
            name:'Magic',
        },
    'health':
        {
            name:'Health',
        },
    'runecrafting':
        {
            name:'Runecrafting',
        },
    'crafting':
        {
            name:'Crafting',
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
};


export default skillBuilder;