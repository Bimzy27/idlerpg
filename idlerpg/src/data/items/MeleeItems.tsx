import {IItemBuilder} from "./ItemBuilder";
import {EquippableSlot} from "../../models/Item";

export const meleeItemBuilder:IItemBuilder =
    {
        'bronze_dagger':
            {
                name: 'Bronze Dagger',
                value: 50,
                slot: [EquippableSlot.MainHand],
                combatStats: {
                    hitpoints: 0,
                    attack: 0,
                    strength: 0,
                    defense: 0,
                },
            },
        'bronze_scimitar':
            {
                name: 'Bronze Scimitar',
                value: 50,
                slot: [EquippableSlot.MainHand],
                combatStats: {
                    hitpoints: 0,
                    attack: 0,
                    strength: 0,
                    defense: 0,
                },
            },
    }