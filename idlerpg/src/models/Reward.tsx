import IId from "./Id";

export interface IReward extends IId
{
    reward();
}

export class ItemReward implements IReward
{
    id: string;

    constructor(id:string, amount:number)
    {
        this.id = id;
    }

    reward() {
        //TODO implement item rewards here.
    }
}

