import {IRequirement} from "./Requirement";
import {IReward} from "./Reward";
import {IItemAmount} from "./Item";
import IId from "./Id";

export interface IQuest
{
    name:string;
    requirements:IRequirement[];
    questPoints:number;
    rewards:IReward[];
    startLocation:string,
    endLocation:string,
    steps:IQuestStep[];
}

export interface IQuestProgress extends IId
{
    progress:number;
}

export interface IQuestStep
{
}

export class MonsterQuestStep implements IQuestStep
{
    monsterId:string = '';
    amount:number = 0;

    constructor(monsterId:string, amount:number)
    {
        this.monsterId = monsterId;
        this.amount = amount;
    }
}

export class ItemQuestStep implements IQuestStep
{
    itemAmount:IItemAmount;

    constructor(itemAmount:IItemAmount)
    {
        this.itemAmount = itemAmount;
    }
}