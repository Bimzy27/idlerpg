import {IReward} from "./Reward";
import {IRequirement, ItemRequirement, SkillRequirement} from "./Requirement";
import {SkillsData} from "../contexts/SkillsContext";
import {ICost} from "./Cost";
import {InventoryData} from "../contexts/InventoryContext";

export interface ITask
{
    name:string;
    intervalSeconds:number;
    requirements:IRequirement[];
    rewards:IReward[];
    costs:ICost[];
}

export function taskMeetsRequirements(task:ITask, skills:SkillsData, inventory:InventoryData):boolean
{
    for (let i = 0; i < task.requirements.length; i++) {
        if (task.requirements[i] instanceof SkillRequirement)
        {
            if (task.requirements[i].meetsRequirement(skills) === false)
            {
                return false;
            }
        }
        else if (task.requirements[i] instanceof ItemRequirement)
        {
            if (task.requirements[i].meetsRequirement(inventory) === false)
            {
                return false;
            }
        }
    }

    return true;
}