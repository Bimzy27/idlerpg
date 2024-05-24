import {CombatData} from "../../contexts/combat/CombatContext";
import mathUtil from "../../common/MathUtil";

export interface IDroptable
{
    drops:IDropValue[];
}

export interface IDropValue
{
    chance:number; //1 in x
    itemId:string;
    minAmount?:number //assumed to be 1, unless overriden
    maxAmount?:number //assumed to be 1, unless overriden
}

export function tryRewardDrops(combatData:CombatData, droptable:IDroptable)
{
    for (const drop of droptable.drops)
    {
        if (drop.chance <= 1)
        {
            rewardDrop(combatData, drop);
        }

        if (mathUtil.getRandomNumber(0, drop.chance - 1) <= 1)
        {
            rewardDrop(combatData, drop);
        }
    }
}

function rewardDrop(combatData:CombatData, drop:IDropValue)
{
    combatData.addLoot([{ id: drop.itemId, amount: getAmount(drop)}]);
}

function getAmount(drop:IDropValue):number
{
    let minAmount = drop.minAmount ? drop.minAmount : 1;
    let maxAmount = drop.maxAmount ? drop.maxAmount : 1;
    if (maxAmount <= minAmount)
    {
        return Math.floor(minAmount);
    }

    return Math.round(mathUtil.getRandomNumber(minAmount, maxAmount))
}