import {createContext, JSX, useContext} from "solid-js";
import {createStore} from "solid-js/store";
import {EquippableSlot, IEquippableItem, IEquipSlot} from "../models/Item";
import useInventory, {InventoryData} from "./InventoryContext";
import itemBuilder, {getItemId} from "../data/items/ItemBuilder";
import {addStats, ICombatStats} from "../models/combat/CombatStats";

export type EquipmentData = {equipment:IEquipSlot[], equip:(item:IEquippableItem)=>void, getCombatStats:()=>ICombatStats};

export const EquipmentContext = createContext<EquipmentData>();

const defaultEquipment:IEquipSlot[] = [
    { slot: EquippableSlot.MainHand, itemId: '' },
    { slot: EquippableSlot.OffHand, itemId: '' },
];

interface EquipmentProps {
    children?: JSX.Element; // Children elements
}

export function EquipmentProvider(props:EquipmentProps) {
    const [equipment, setEquipment] = createStore<IEquipSlot[]>(defaultEquipment);
    const inventory = useInventory() as InventoryData;

    const equips:EquipmentData = {
        equipment: equipment,
        equip: (item:IEquippableItem)=>{
            let equipped:boolean = false;
            let oldItemId:string = '';

            for (let i = 0; i < item.slot.length; i++)
            {
                for (let j = 0; j < equipment.length; j++)
                {
                    if (equipment[j].slot === item.slot[i])
                    {
                        const itemId = getItemId(item);
                        if (equipment[j].itemId !== itemId)
                        {
                            oldItemId = equipment[j].itemId;
                            setEquipment(equipSlot => equipSlot.itemId === equipment[j].itemId, 'itemId', itemId);
                            equipped = true;
                        }
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
        getCombatStats: ()=>
        {
            let stats:ICombatStats = {hitpoints:0, attack:0, strength:0, defense:0};
            equipment.forEach(item =>
            {
                stats = addStats(stats, (itemBuilder[item.itemId] as IEquippableItem).combatStats);
            });
            return stats;
        }
    };

    return (
        <EquipmentContext.Provider value={equips}>
            {props.children}
        </EquipmentContext.Provider>
    );
}

export default function useEquipment() { return useContext(EquipmentContext) }