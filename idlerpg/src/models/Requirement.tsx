import {getLevel, ISkillValue} from "./Skill";
import {SkillsData} from "../contexts/SkillsContext";
import {IItemAmount} from "./Item";
import {InventoryData} from "../contexts/InventoryContext";
import {ITask} from "./Task";

export interface IRequirement
{
    meetsRequirement(contextData:unknown):boolean;
}

export class SkillRequirement implements IRequirement
{
    skillValue:ISkillValue;

    constructor(skillValue:ISkillValue)
    {
        this.skillValue = skillValue;
    }

    meetsRequirement(contextData:unknown): boolean {
        const skills = contextData as SkillsData;
        for (let i = 0; i < skills.skills.length; i++) {
            if (skills.skills[i].id === this.skillValue.id && skills.skills[i].exp >= this.skillValue.exp)
            {
                return true;
            }
        }

        return false;
    }
}

export class ItemRequirement implements IRequirement
{
    itemAmount:IItemAmount;

    constructor(itemAmount:IItemAmount)
    {
        this.itemAmount = itemAmount;
    }

    meetsRequirement(contextData:unknown): boolean {
        const inventory = contextData as InventoryData;
        return inventory.hasItem(this.itemAmount);
    }
}

export function getRequirements(data:Object[]):IRequirement[]
{
    let requirements:IRequirement[] = [];
    for (const requirement of data) {
        if ('itemAmount' in requirement)
        {
            requirements.push(new ItemRequirement(requirement.itemAmount as IItemAmount));
        }
        else if ('skillValue' in requirement)
        {
            requirements.push(new SkillRequirement(requirement.skillValue as ISkillValue));
        }
    }
    return requirements;
}

export function meetsRequirements(requirements:IRequirement[], skills:SkillsData, inventory:InventoryData):boolean
{
    for (let i = 0; i < requirements.length; i++) {
        if (requirements[i] instanceof SkillRequirement)
        {
            if (requirements[i].meetsRequirement(skills) === false)
            {
                return false;
            }
        }
        else if (requirements[i] instanceof ItemRequirement)
        {
            if (requirements[i].meetsRequirement(inventory) === false)
            {
                return false;
            }
        }
    }

    return true;
}