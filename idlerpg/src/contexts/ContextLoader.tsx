import {JSX} from "solid-js";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {getExpFromLevel, ISkillValue} from "../models/Skill";
import useSkills, {defaultSkills, SkillsData} from "./SkillsContext";
import {useAuth, useFirebaseApp} from "solid-firebase";
import {getAuth} from "firebase/auth";
import usePlayer, {PlayerData} from "./PlayerContext";
import {EquippableSlot, IEquipSlot} from "../models/Item";
import useEquipment, {defaultEquipment, EquipmentData} from "./EquipmentContext";

interface IContextLoaderProps {
    children?: JSX.Element;
}

export function ContextLoader(props:IContextLoaderProps) {

    const app = useFirebaseApp();
    const db = getFirestore(app);
    const auth = useAuth(getAuth(app));
    const skillsData = useSkills() as SkillsData;
    const equipmentData = useEquipment() as EquipmentData;
    const player = usePlayer() as PlayerData;

    async function loadUserSkillsData()
    {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) =>
        {
            if (doc.id === auth.data?.uid)
            {
                const skills = doc.data().skills;
                const skillValues:ISkillValue[] = defaultSkills;
                for(let skillId in skills)
                {
                    for (let i = 0; i < skillValues.length; i++)
                    {
                        if (skillValues[i].id === skillId)
                        {
                            const exp = skillId === 'hitpoints' ? getExpFromLevel(10) : skills[skillId];
                            skillValues[i] = {
                                id: skillId,
                                exp: exp,
                            }
                        }
                    }
                }
                skillsData.setSkills(skillValues);
            }
        });
    }

    loadUserSkillsData().then(r => player.setInitialPlayerStats());

    async function loadUserEquipmentData()
    {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) =>
        {
            if (doc.id === auth.data?.uid)
            {
                const equipment = doc.data().equipment;
                const itemEquips:IEquipSlot[] = defaultEquipment;
                for(let slotName in equipment)
                {
                    for (let i = 0; i < itemEquips.length; i++)
                    {
                        const slot = (Number(slotName)) as EquippableSlot;
                        if (itemEquips[i].slot === slot)
                        {
                            itemEquips[i] =
                                {
                                    slot: slot,
                                    itemId: equipment[slot],
                                };
                        }
                    }
                }
                equipmentData.setEquipment(itemEquips);
            }
        });
    }

    loadUserEquipmentData().then(r => player.setInitialPlayerStats());

    return (
        <div>
            {props.children}
        </div>
    );
}