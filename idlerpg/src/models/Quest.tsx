import {IRequirement} from "./Requirement";
import {IReward} from "./Reward";

export interface IQuest
{
    name:string;
    requirements:IRequirement[];
    rewards:IReward[];
    steps:IQuestStep[];
}

export interface IQuestStep
{
}

class MonsterQuestStep implements IQuestStep
{
    monsterId:string = '';
    amount:number = 0;

    constructor(monsterId:string, amount:number)
    {
        this.monsterId = monsterId;
        this.amount = amount;
    }
}