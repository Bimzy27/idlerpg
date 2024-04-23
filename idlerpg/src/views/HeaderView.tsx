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
import useContextSaver, {ContextSaverData} from "../contexts/ContextSaver";

interface IHeaderViewProps
{

}

const HeaderView: Component<IHeaderViewProps> = (props) => {
    const app = useFirebaseApp();
    const contextSaver = useContextSaver() as ContextSaverData;

    async function signOutUser()
    {
        await signOut(getAuth(app));
    }

    return (
        <StyledHeaderView>
            <CoreImage src={`/assets/icon.png`} alt="NO IMG" style={{"margin-right": '50px'}} width={120} height={120}></CoreImage>
            <CoreText style={{"font-size": '46px'}}>Idle RPG</CoreText>
            <CoreButton style={{"margin-left": "auto", 'width': '180px', 'height': '50px'}} onClick={contextSaver.saveUserData}>Save</CoreButton>
            <CoreButton style={{"margin-left": "auto", 'width': '180px', 'height': '50px'}} onClick={signOutUser}>Sign Out</CoreButton>
        </StyledHeaderView>
    );
};

export default HeaderView;