import {IRequirement} from "./Requirement";
import {IReward} from "./Reward";
import {IItemAmount} from "./Item";
import IId from "./Id";
import {IEnemyAmount} from "./combat/Enemy";

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
    stepProgress:number;
}

export interface IQuestStep
{
}

export class EnemyQuestStep implements IQuestStep
{
    enemyAmount:IEnemyAmount;

    constructor(enemyAmount:IEnemyAmount)
    {
        this.enemyAmount = enemyAmount;
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

export const questProgressOffset = 3;