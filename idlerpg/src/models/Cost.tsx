import {IItemAmount} from "./Item";
import {InventoryData} from "../contexts/InventoryContext";

export interface ICost
{
    consume(contextData:unknown):void;
}

export class ItemCost implements ICost
{
    itemAmount:IItemAmount;

    constructor(itemAmount:IItemAmount)
    {
        this.itemAmount = itemAmount;
    }

    consume(contextData:unknown):void {
        const inventory = contextData as InventoryData;
        inventory?.removeItem(this.itemAmount);
    }
}