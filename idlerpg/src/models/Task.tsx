import {IReward} from "./Reward";
import {IRequirement} from "./Requirement";
import {ICost} from "./Cost";

export interface ITask
{
    name:string;
    intervalSeconds:number;
    requirements:IRequirement[];
    rewards:IReward[];
    costs:ICost[];
}