import {IItemAmount} from "./Item";

export interface IVendor
{
    name:string;
    items:IVendorItem[]
}

export interface IVendorItem
{
    cost:number;
    item:IItemAmount;
}