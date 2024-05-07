import {JSX} from "solid-js";
import {useFirebaseApp} from "solid-firebase";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {IEquippableItem, IFood, IItem, IWeapon} from "../models/Item";
import {getRequirements} from "../models/Requirement";

type ItemDic = Record<string, IItem>;

interface IItemLoaderProps {
    children?: JSX.Element;
    incrementLoadable:()=>void;
}

export let itemData: ItemDic = {
};

export function ItemLoader(props:IItemLoaderProps) {

    const app = useFirebaseApp();
    const db = getFirestore(app);

    async function loadItemData()
    {
        const querySnapshot = await getDocs(collection(db, "items"));
        querySnapshot.forEach((doc) =>
        {
            let item:IItem | IEquippableItem | IWeapon | IFood;
            if (doc.data().attackSpeed) // Is weapon
            {
                item =
                    {
                        name: doc.data().name,
                        value: doc.data().value,
                        slot: doc.data().slot,
                        requirements: getRequirements(doc.data().requirements),
                        attackStats: doc.data().attackStats,
                        defenseStats: doc.data().defenseStats,
                        attackSpeed: doc.data().attackSpeed,
                        attackType: doc.data().attackType,
                        isTwoHanded: doc.data().isTwoHanded,
                    };
            }
            else if (doc.data().slot)
            {
                item =
                    {
                        name: doc.data().name,
                        value: doc.data().value,
                        slot: doc.data().slot,
                        requirements: getRequirements(doc.data().requirements),
                        attackStats: doc.data().attackStats,
                        defenseStats: doc.data().defenseStats,
                    };
            }
            else if (doc.data().healing)
            {
                item =
                    {
                        name: doc.data().name,
                        value: doc.data().value,
                        healing: doc.data().healing,
                    };
            }
            else
            {
                item =
                    {
                        name: doc.data().name,
                        value: doc.data().value,
                    };
            }

            itemData = {...itemData, [doc.id]: item}
        });
    }

    loadItemData().then(r => {
        console.log('Items Loaded');
        props.incrementLoadable();
    });

    return (
        <div>
            {props.children}
        </div>
    );
}

export const getItemId = (item:IItem) => {
    for (const id in itemData) {
        if (itemData[id] === item) {
            return id;
        }
    }
    throw new Error('Item not found');
};