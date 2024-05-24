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