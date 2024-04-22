import {IEquippableItem, IItem, IWeapon} from "../../models/Item";
import {meleeItemBuilder} from "./MeleeItems";
import {rangedItemBuilder} from "./RangedItems";
import {woodcuttingItemBuilder} from "./WoodcuttingItems";
import {miningItemBuilder} from "./MiningItems";
import {smithingItemBuilder} from "./SmithingItems";
import {prayerItemBuilder} from "./PrayerItems";
import {foodItemBuilder} from "./FoodItems";
import {cookingItemBuilder} from "./CookingItems";
import {fletchingItemBuilder} from "./FletchingItems";
import {craftingItemBuilder} from "./CraftingItems";

export interface IItemBuilder
{
    [id:string]:IItem | IEquippableItem | IWeapon
}

const itemBuilder:IItemBuilder =
    {
        '':{name:'', value: -1},
        ...meleeItemBuilder,
        ...rangedItemBuilder,
        ...prayerItemBuilder,
        ...foodItemBuilder,
        ...woodcuttingItemBuilder,
        ...miningItemBuilder,
        ...smithingItemBuilder,
        ...cookingItemBuilder,
        ...fletchingItemBuilder,
        ...craftingItemBuilder,
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