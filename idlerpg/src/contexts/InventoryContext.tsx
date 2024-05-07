import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";
import {IItem, IItemAmount} from "../models/Item";
import {createStore} from "solid-js/store";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {useAuth, useFirebaseApp} from "solid-firebase";
import {getAuth} from "firebase/auth";
import {itemData} from "../loaders/ItemLoader";

export type InventoryData = {
    coins:Accessor<number>,
    hasCoins:(amount:number)=>boolean,
    addCoins:(amount:number)=>void,
    removeCoins:(amount:number)=>void,
    items:IItemAmount[],
    addItem:(item:IItemAmount)=>void,
    addItems:(items:IItemAmount[])=>void,
    removeItem:(item:IItemAmount)=>void,
    hasItem:(item:IItemAmount)=>boolean
    getItem:(itemId:string)=>IItemAmount
    selectedItem:Accessor<string>,
    setSelectedItem:(itemId:string)=>void};

export const InventoryContext = createContext<InventoryData>();

interface InventoryProps {
    children?: JSX.Element; // Children elements
}

export function InventoryProvider(props:InventoryProps) {
    const [coins, setCoins] = createSignal(0);
    const [items, setItems] = createStore<IItemAmount[]>([]);
    const [selectedItem, setSelectedItem] = createSignal('none');

    const inventoryItems:InventoryData = {
        coins:coins,
        hasCoins:(amount:number)=>
        {
            return coins() >= amount;
        },
        addCoins:(amount:number)=>
        {
            setCoins(coins() + amount);
        },
        removeCoins:(amount:number)=>
        {
            setCoins(Math.max(coins() - amount, 0));
        },
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
        addItems:(items:IItemAmount[])=>
        {
            for (const item of items) {
                inventoryItems.addItem(item);
            }
        },
        removeItem: (item:IItemAmount)=>{
            const currentItem: IItemAmount | undefined = items.find(invItem => invItem.id === item.id);
            if (currentItem)
            {
                //Has existing item
                let finalAmount = Math.max(0, currentItem.amount - item.amount)
                if (finalAmount === 0)
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
        },
        getItem: (itemId:string)=>{
            for (let i = 0; i < items.length; i++) {
                if (items[i].id === itemId)
                {
                    return items[i];
                }
            }
            return { id:'', amount: -1 };
        },
        selectedItem: selectedItem,
        setSelectedItem: (itemId:string)=>
        {
            setSelectedItem(itemId);
        },
    };

    const app = useFirebaseApp();
    const db = getFirestore(app);
    const auth = useAuth(getAuth(app))

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