import {IReward} from "./Reward";
import {IRequirement, SkillRequirement} from "./Requirement";
import {SkillsData} from "../contexts/SkillsContext";

export interface ITask
{
    name:string;
    durationSeconds:number;
    requirements:IRequirement[];
    rewards:IReward[];
}

export function taskMeetsRequirements(task:ITask, skills:SkillsData):boolean
{
    for (let i = 0; i < task.requirements.length; i++) {
        if (task.requirements[i] instanceof SkillRequirement)
        {
            if (task.requirements[i].meetsRequirement(skills) === false)
            {
                return false;
            }
        }
    }

    return true;
}