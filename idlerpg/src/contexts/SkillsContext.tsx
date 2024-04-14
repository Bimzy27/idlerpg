import {createContext, JSX, useContext} from "solid-js";
import {createStore} from "solid-js/store";
import {getExpFromLevel, ISkillValue} from "../models/Skill";
import skillBuilder from "../data/SkillBuilder";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {useAuth, useFirebaseApp} from "solid-firebase";
import {getAuth} from "firebase/auth";

export type SkillsData = {skills:ISkillValue[], addExp:(skillValue:ISkillValue)=>void};

export const SkillsContext = createContext<SkillsData>();

const defaultSkills:ISkillValue[] = Object.keys(skillBuilder).map(id => ({
    id,
    exp: 0,
}));

interface SkillProps {
    children?: JSX.Element; // Children elements
}

export function SkillProvider(props:SkillProps) {
    const app = useFirebaseApp();
    const db = getFirestore(app);
    const auth = useAuth(getAuth(app));

    const [skills, setSkills] = createStore<ISkillValue[]>([]);

    const skillsExp:SkillsData = {
        skills: skills,
        addExp: (skillValue:ISkillValue)=>{

            const newSkills:ISkillValue[] = [];
            for (let i = 0; i < skills.length; i++) {
                if (skills[i].id === skillValue.id)
                {
                    newSkills.push({ id: skillValue.id, exp: skills[i].exp + skillValue.exp});
                }
                else
                {
                    newSkills.push(skills[i]);
                }
            }
            setSkills(newSkills);
        },
    };

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
                setSkills(skillValues);
            }
        });
    }

    loadUserSkillsData();

    return (
        <SkillsContext.Provider value={skillsExp}>
            {props.children}
        </SkillsContext.Provider>
    );
}

export default function useSkills() { return useContext(SkillsContext) }