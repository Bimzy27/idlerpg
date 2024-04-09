import {IReward} from "./Reward";

export interface ITask
{
    name:string;
    durationSeconds:number;
    rewards:IReward[];
}