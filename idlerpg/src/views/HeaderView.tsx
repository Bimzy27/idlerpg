import {CoreButton, CoreImage, CoreText, StyledHeaderView} from "../styles/styles";
import { Component } from 'solid-js'
import {useAuth, useFirebaseApp} from "solid-firebase";
import {addDoc, collection, doc, getFirestore, setDoc, updateDoc} from "firebase/firestore";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {getAuth, signOut} from "firebase/auth";
import useSkills, {SkillsData} from "../contexts/SkillsContext";
import {ISkillValue} from "../models/Skill";
import useInventory, {InventoryData} from "../contexts/InventoryContext";
import useEquipment, {EquipmentData} from "../contexts/EquipmentContext";

interface IHeaderViewProps
{

}

const HeaderView: Component<IHeaderViewProps> = (props) => {

    const app = useFirebaseApp();
    const db = getFirestore(app);
    const auth = useAuth(getAuth(app));
    const skills = useSkills() as SkillsData;
    const inventory = useInventory() as InventoryData;
    const equipment = useEquipment() as EquipmentData;
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
    }

    async function signOutUser()
    {
        await signOut(getAuth(app));
    }

    return (
        <StyledHeaderView>
            <CoreImage src={`/assets/icon.png`} alt="NO IMG" style={{"margin-right": '50px'}} width={120} height={120}></CoreImage>
            <CoreText style={{"font-size": '46px'}}>Idle RPG</CoreText>
            <CoreButton style={{"margin-left": "auto", 'width': '180px', 'height': '50px'}} onClick={saveUserData}>Save</CoreButton>
            <CoreButton style={{"margin-left": "auto", 'width': '180px', 'height': '50px'}} onClick={signOutUser}>Sign Out</CoreButton>
        </StyledHeaderView>
    );
};

export default HeaderView;