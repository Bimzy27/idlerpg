export interface ILocation
{
    name:string;
    skillIds:string[]
    taskIds:string[]
    vendorIds:string[]
    enemyIds:string[]
    coord:Coord
}

export class Coord
{
    x:number;
    y:number;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
}

export const mapCoords:Coord = {x:2200, y:1200}