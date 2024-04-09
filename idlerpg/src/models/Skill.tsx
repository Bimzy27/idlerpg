import IId from "./Id";

export interface ISkill
{
    name: string
}

export interface ISkillValue extends IId
{
    exp: number
}