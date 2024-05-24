import {createContext, JSX, useContext} from "solid-js";
import {createStore} from "solid-js/store";
import {getExpFromLevel, getLevel, ISkillValue} from "../models/Skill";
import skillBuilder from "../data/SkillBuilder";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {useAuth, useFirebaseApp} from "solid-firebase";
import {getAuth} from "firebase/auth";

export type SkillsData = {
    skills:ISkillValue[],
    addExp:(skillValue:ISkillValue)=>void,
    getSkillLevel:(skillId:string)=>number,
    setSkills:(skills:ISkillValue[])=>void,
};

export const SkillsContext = createContext<SkillsData>();

export const defaultSkills:ISkillValue[] = Object.keys(skillBuilder).map(id => ({
    id,
    exp: id === 'hitpoints' ? getExpFromLevel(10) : 0,
}));

interface SkillProps {
    children?: JSX.Element; // Children elements
}

export function SkillProvider(props:SkillProps) {
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
        getSkillLevel: (skillId:string)=>
        {
            for (let i = 0; i < skills.length; i++) {
                if (skills[i].id === skillId)
                {
                    return getLevel(skills[i]);
                }
            }
            return 0;
        },
        setSkills:(skills:ISkillValue[])=>
        {
            setSkills(skills);
        }
    };

    return (
        <SkillsContext.Provider value={skillsExp}>
            {props.children}
        </SkillsContext.Provider>
    );
}

export default function useSkills() { return useContext(SkillsContext) }