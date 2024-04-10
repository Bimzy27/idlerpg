import {createContext, JSX, useContext} from "solid-js";
import {createStore} from "solid-js/store";
import {ISkillValue} from "../models/Skill";
import skillBuilder from "../data/SkillBuilder";

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
    const [skills, setSkills] = createStore(defaultSkills);
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

    return (
        <SkillsContext.Provider value={skillsExp}>
            {props.children}
        </SkillsContext.Provider>
    );
}

export default function useSkills() { return useContext(SkillsContext) }