export interface IReward
{
    reward();
}

export class ItemReward implements IReward
{
    constructor(id:string, amount:number)
    {
    }

    reward() {
        //TODO implement item rewards here.
    }
}

