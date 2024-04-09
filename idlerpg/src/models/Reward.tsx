import IId from "./Id";
import useInventory from "../contexts/InventoryContext";
import {IItemAmount} from "./Item";

export interface IReward
{
    reward():void;
}

export class ItemReward implements IReward
{
    itemAmount:IItemAmount;

    constructor(itemAmount:IItemAmount)
    {
        this.itemAmount = itemAmount;
    }

    reward():void {
        const inventory = useInventory();
        inventory?.addItem(this.itemAmount);

        console.log('Item Rewarded: ' + this.itemAmount.id)
    }
}

