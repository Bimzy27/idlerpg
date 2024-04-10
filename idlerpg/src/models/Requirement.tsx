import {getLevel, ISkillValue} from "./Skill";
import {SkillsData} from "../contexts/SkillsContext";

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