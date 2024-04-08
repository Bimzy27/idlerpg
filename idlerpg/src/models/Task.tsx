import {IReward} from "./Reward";

export interface ITask
{
    id:string;
    name:string;
    durationSeconds:number;
    rewards:IReward[];
}