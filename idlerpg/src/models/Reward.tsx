import IId from "./Id";
import useInventory, {InventoryData} from "../contexts/InventoryContext";
import {IItemAmount} from "./Item";
import {SkillsData} from "../contexts/SkillsContext";
import {ISkillValue} from "./Skill";
import useQuests, {QuestData} from "../contexts/QuestContext";

export interface IReward
{
    reward(contextData:unknown):void;
}

export class ItemReward implements IReward
{
    itemAmount:IItemAmount;

    constructor(itemAmount:IItemAmount)
    {
        this.itemAmount = itemAmount;
    }

    reward(contextData:unknown):void {
        const inventory = contextData as InventoryData;
        inventory?.addItem(this.itemAmount);
    }
}

export class SkillReward implements IReward
{
    skillValue:ISkillValue;

    constructor(skillValue:ISkillValue)
    {
        this.skillValue = skillValue;
    }

    reward(contextData:unknown):void {
        const skills = contextData as SkillsData;
        skills?.addExp(this.skillValue)
    }
}