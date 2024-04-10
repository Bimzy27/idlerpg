import {createContext, JSX, useContext} from "solid-js";
import {IItemAmount} from "../models/Item";
import {createStore} from "solid-js/store";

export type InventoryData = {items:IItemAmount[], addItem:(item:IItemAmount)=>void};

export const InventoryContext = createContext<InventoryData>();

const defaultItems:IItemAmount[] =
    [
    ]

interface InventoryProps {
    children?: JSX.Element; // Children elements
}

export function InventoryProvider(props:InventoryProps) {
    const [items, setItems] = createStore(defaultItems);
    const inventoryItems:InventoryData = {
        items: items,
        addItem: (item:IItemAmount)=>{
            const currentItem: IItemAmount | undefined = items.find(invItem => invItem.id === item.id);
            if (currentItem)
            {
                //Has existing item
                let finalAmount = Math.max(0, currentItem.amount + item.amount)
                setItems(invItem => invItem.id === item.id, 'amount', finalAmount);
            }
            else if (item.id !== '' && item.id !== 'none')
            {
                //Add new item
                const newItem = {id: item.id, amount: item.amount}
                const newItems:IItemAmount[] = [...items, newItem];
                setItems(newItems);
            }
        },
    };

    return (
        <InventoryContext.Provider value={inventoryItems}>
            {props.children}
        </InventoryContext.Provider>
    );
}

export default function useInventory() { return useContext(InventoryContext) }