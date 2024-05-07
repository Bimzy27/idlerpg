import {createContext, JSX, useContext} from "solid-js";
import {createStore} from "solid-js/store";
import {EquippableSlot, IEquippableItem, IEquipSlot, IWeapon} from "../models/Item";
import useInventory, {InventoryData} from "./InventoryContext";
import {combineAttackStats, combineDefenseStats, IAttackStats, IDefenseStats} from "../models/combat/CombatStats";
import {getItemId, itemData} from "../loaders/ItemLoader";

export type EquipmentData = {
    equipment:IEquipSlot[],
    equip:(item:IEquippableItem)=>void,
    getAttackStats:()=>IAttackStats,
    getDefenseStats:()=>IDefenseStats,
    getEquipment:(equipSlot:EquippableSlot)=>IEquipSlot,
    setEquipment:(itemEquips:IEquipSlot[])=>void,
    getWeapon:()=>IWeapon,
};

export const EquipmentContext = createContext<EquipmentData>();

export const defaultEquipment:IEquipSlot[] = [
    { slot: EquippableSlot.MainHand, itemId: 'none' },
    { slot: EquippableSlot.OffHand, itemId: 'none' },
];

interface EquipmentProps {
    children?: JSX.Element; // Children elements
}

export function EquipmentProvider(props:EquipmentProps) {
    const [equipment, setEquipment] = createStore<IEquipSlot[]>(defaultEquipment);
    const inventory = useInventory() as InventoryData;

    const equips:EquipmentData = {
        equipment: equipment,
        getEquipment: (equipSlot:EquippableSlot)=>
        {
            for (const es of equipment)
            {
                if (es.slot === equipSlot)
                {
                    return es;
                }
            }

            return { itemId: 'none', slot:equipSlot };
        },
        setEquipment:(itemEquips:IEquipSlot[])=>
        {
            setEquipment(itemEquips)
        },
        equip: (item:IEquippableItem)=>{
            let equipped:boolean = false;
            let oldItemId:string = '';

            for (let i = 0; i < equipment.length; i++)
            {
                if (equipment[i].slot === item.slot)
                {
                    const itemId = getItemId(item);
                    if (equipment[i].itemId !== itemId)
                    {
                        oldItemId = equipment[i].itemId;
                        setEquipment(equipSlot => equipSlot.itemId === equipment[i].itemId, 'itemId', itemId);
                        equipped = true;
                    }
                }
            }

            if (equipped)
            {
                if (oldItemId != '')
                {
                    inventory.addItem({ id: oldItemId, amount: 1});
                }
                inventory.removeItem({ id: getItemId(item), amount: 1});
            }
        },
        getAttackStats: ()=>
        {
            let stats:IAttackStats = {
                stabBonus:0,
                slashBonus:0,
                blockBonus:0,
                meleeStrength:0,
                rangedBonus:0,
                rangedStrength:0,
                magicBonus:0,
                magicStrength:0,
            };
            equipment.forEach(item =>
            {
                stats = combineAttackStats(stats, (itemData[item.itemId] as IEquippableItem).attackStats);
            });
            return stats;
        },
        getDefenseStats: ()=>
        {
            let stats:IDefenseStats = {
                meleeDefense:0,
                rangedDefense:0,
                magicDefense:0,
                damageReduction:0,
            };
            equipment.forEach(item =>
            {
                stats = combineDefenseStats(stats, (itemData[item.itemId] as IEquippableItem).defenseStats);
            });
            return stats;
        },
        getWeapon: ()=>
        {
            return itemData[equips.getEquipment(EquippableSlot.MainHand).itemId] as IWeapon;
        }
    };

    return (
        <EquipmentContext.Provider value={equips}>
            {props.children}
        </EquipmentContext.Provider>
    );
}

export default function useEquipment() { return useContext(EquipmentContext) }