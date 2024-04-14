import {IEquippableItem, IItem} from "../../models/Item";
import {meleeItemBuilder} from "./MeleeItems";
import {rangedItemBuilder} from "./RangedItems";
import {woodcuttingItemBuilder} from "./WoodcuttingItems";
import {miningItemBuilder} from "./MiningItems";
import {smithingItemBuilder} from "./SmithingItems";
import {ITask} from "../../models/Task";
import taskBuilder from "../tasks/TaskBuilder";

export interface IItemBuilder
{
    [id:string]:IItem | IEquippableItem
}

const itemBuilder:IItemBuilder =
    {
        '':{name:'', value: -1},
        ...meleeItemBuilder,
        ...rangedItemBuilder,
        ...woodcuttingItemBuilder,
        ...miningItemBuilder,
        ...smithingItemBuilder,
    };

export const getItemId = (item:IItem) => {
    for (const id in itemBuilder) {
        if (itemBuilder[id] === item) {
            return id;
        }
    }
    throw new Error('Item not found in itemBuilder');
};

export default itemBuilder;