import IId from "./Id";

export interface IItem
{
    name:string;
    value:number
}

export interface IItemAmount extends IId
{
    amount:number;
}