import {createContext, JSX, useContext} from "solid-js";
import {collection, doc, getFirestore, updateDoc} from "firebase/firestore";
import {useAuth, useFirebaseApp} from "solid-firebase";
import {getAuth} from "firebase/auth";
import useSkills, {SkillsData} from "./SkillsContext";
import useInventory, {InventoryData} from "./InventoryContext";
import useEquipment, {EquipmentData} from "./EquipmentContext";
import usePlayer, {PlayerData} from "./PlayerContext";

export type ContextSaverData = {
    saveUserData:()=>void,
};

export const ContextSaverContext = createContext<ContextSaverData>();

interface IContextSaverProps {
    children?: JSX.Element;
}

export function ContextSaver(props:IContextSaverProps) {
    const app = useFirebaseApp();
    const db = getFirestore(app);
    const auth = useAuth(getAuth(app));
    const skills = useSkills() as SkillsData;
    const inventory = useInventory() as InventoryData;
    const equipment = useEquipment() as EquipmentData;
    const player = usePlayer() as PlayerData;

    async function saveUserData()
    {
        const userDocRef = doc(collection(db, "users"), auth.data?.uid); // Create doc ref with user ID
        try {
            const skillMap: Record<string, number> = {};
            for (const skill of skills.skills) {
                skillMap[skill.id] = skill.exp;
            }
            await updateDoc(userDocRef, { skills: skillMap });
        } catch (error) {
            console.error("Error saving skills to Firestore:", error);
        }

        try {
            const invMap: Record<string, number> = {};
            for (const item of inventory.items) {
                invMap[item.id] = item.amount;
            }
            await updateDoc(userDocRef, { inventory: invMap });
        } catch (error) {
            console.error("Error saving inventory to Firestore:", error);
        }

        try {
            const equipMap: Record<number, string> = {};
            for (const equipSlot of equipment.equipment) {
                equipMap[equipSlot.slot] = equipSlot.itemId;
            }
            await updateDoc(userDocRef, { equipment: equipMap });
        } catch (error) {
            console.error("Error saving equipment to Firestore:", error);
        }

        try {
            await updateDoc(userDocRef, { food: player.food() });
        } catch (error) {
            console.error("Error saving equipment to Firestore:", error);
        }
    }

    const contextSaver:ContextSaverData = {
        saveUserData: ()=>
        {
            saveUserData();
        },
    };

    return (
        <ContextSaverContext.Provider value={contextSaver}>
            {props.children}
        </ContextSaverContext.Provider>
    );
}


export default function useContextSaver() { return useContext(ContextSaverContext) }