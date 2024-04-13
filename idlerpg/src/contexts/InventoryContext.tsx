import {createContext, JSX, useContext} from "solid-js";
import {IItemAmount} from "../models/Item";
import {createStore} from "solid-js/store";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {useAuth, useFirebaseApp} from "solid-firebase";
import {getAuth} from "firebase/auth";
import {ISkillValue} from "../models/Skill";

export type InventoryData = {items:IItemAmount[], addItem:(item:IItemAmount)=>void, removeItem:(item:IItemAmount)=>void, hasItem:(item:IItemAmount)=>boolean};

export const InventoryContext = createContext<InventoryData>();

interface InventoryProps {
    children?: JSX.Element; // Children elements
}

export function InventoryProvider(props:InventoryProps) {
    const app = useFirebaseApp();
    const db = getFirestore(app);
    const auth = useAuth(getAuth(app))

    const [items, setItems] = createStore<IItemAmount[]>([]);
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
        removeItem: (item:IItemAmount)=>{
            const currentItem: IItemAmount | undefined = items.find(invItem => invItem.id === item.id);
            if (currentItem)
            {
                //Has existing item
                let finalAmount = Math.max(0, currentItem.amount - item.amount)
                if (finalAmount == 0)
                {
                    const filteredItems = items.filter(invItem => invItem.id !== item.id);
                    setItems(filteredItems);
                }
                else
                {
                    setItems(invItem => invItem.id === item.id, 'amount', finalAmount);
                }
            }
        },
        hasItem: (item:IItemAmount)=>{
            for (let i = 0; i < items.length; i++) {
                if (items[i].id === item.id && items[i].amount >= item.amount)
                {
                    return true;
                }
            }
            return false;
        }
    };

    async function loadUserInventoryData()
    {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) =>
        {
            if (doc.id === auth.data?.uid)
            {
                const inventory = doc.data().inventory;
                const itemAmounts:IItemAmount[] = [];
                for(let itemId in inventory)
                {
                    itemAmounts.push(
                        {
                            id: itemId,
                            amount: inventory[itemId],
                        }
                    );
                }
                setItems(itemAmounts);
            }
        });
    }

    loadUserInventoryData();

    return (
        <InventoryContext.Provider value={inventoryItems}>
            {props.children}
        </InventoryContext.Provider>
    );
}

export default function useInventory() { return useContext(InventoryContext) }