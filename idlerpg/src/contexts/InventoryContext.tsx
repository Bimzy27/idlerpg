import {createContext, JSX, useContext} from "solid-js";
import {IItemAmount} from "../models/Item";
import {createStore} from "solid-js/store";

type InventoryData = {items:IItemAmount[], addItem:(item:IItemAmount)=>void};

export const InventoryContext = createContext<InventoryData>();

const defaultItems:IItemAmount[] =
    [
        {id:'oak_log', amount:1},
        {id:'bronze_arrow', amount:2},
        {id:'normal_shortbow', amount:2},
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
                const newItems:IItemAmount[] = [...items, item];
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

export function useInventory() { return useContext(InventoryContext) }