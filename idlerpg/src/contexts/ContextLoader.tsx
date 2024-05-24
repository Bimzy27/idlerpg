import {JSX} from "solid-js";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {getExpFromLevel, ISkillValue} from "../models/Skill";
import useSkills, {defaultSkills, SkillsData} from "./SkillsContext";
import {useAuth, useFirebaseApp} from "solid-firebase";
import {getAuth} from "firebase/auth";
import usePlayer, {PlayerData} from "./PlayerContext";
import {EquippableSlot, IEquipSlot} from "../models/Item";
import useEquipment, {defaultEquipment, EquipmentData} from "./EquipmentContext";
import useInventory, {InventoryData} from "./InventoryContext";
import useMap, {MapData} from "./MapContext";
import useQuests, {defaultQuests, QuestData} from "./QuestContext";
import {IQuestProgress} from "../models/Quest";

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
    const inventory = useInventory() as InventoryData;
    const map = useMap() as MapData;
    const quests = useQuests() as QuestData;

    async function loadUserSkills()
    {
        const querySnapshot = await getDocs(collection(db, "users"));
        const skillValues:ISkillValue[] = defaultSkills;
        querySnapshot.forEach((doc) =>
        {
            if (doc.id === auth.data?.uid)
            {
                const skills = doc.data().skills;
                for(let skillId in skills)
                {
                    for (let i = 0; i < skillValues.length; i++)
                    {
                        if (skillValues[i].id === skillId)
                        {
                            skillValues[i] = {
                                id: skillId,
                                exp: skills[skillId],
                            }
                        }
                    }
                }
            }
        });
        skillsData.setSkills(skillValues);
    }
    loadUserSkills().then(r => player.setInitialPlayerStats());

    async function loadUserEquipment()
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
    loadUserEquipment().then(r => player.setInitialPlayerStats());

    async function loadUserFood()
    {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) =>
        {
            if (doc.id === auth.data?.uid)
            {
                const food = doc.data().food;
                if (food)
                {
                    player.setFood(food);
                }
            }
        });
    }
    loadUserFood()

    async function loadUserCoins()
    {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) =>
        {
            if (doc.id === auth.data?.uid)
            {
                const coins = doc.data().coins;
                if (coins)
                {
                    inventory.addCoins(coins);
                }
            }
        });
    }
    loadUserCoins()

    async function loadUserLocation()
    {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) =>
        {
            if (doc.id === auth.data?.uid)
            {
                const location = doc.data().location;
                if (location)
                {
                    map.setLocation(location);
                }
            }
        });
    }
    loadUserLocation()

    async function loadUserQuests()
    {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) =>
        {
            if (doc.id === auth.data?.uid)
            {
                const questsData = doc.data().quests;
                const defQuests:IQuestProgress[] = defaultQuests;
                for(let questId in questsData)
                {
                    for (let i = 0; i < defQuests.length; i++)
                    {
                        if (defQuests[i].id === questId)
                        {
                            defQuests[i] =
                                {
                                    id: questId,
                                    progress: questsData[questId].progress,
                                    stepProgress: questsData[questId].stepProgress,
                                };
                        }
                    }
                }
                quests.setQuestsProgress(defQuests);
            }
        });
    }
    loadUserQuests().then();

    return (
        <div>
            {props.children}
        </div>
    );
}