import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";
import {ITask, taskMeetsRequirements} from "../models/Task";
import taskBuilder from "../data/TaskBuilder";
import useSkills, {SkillsData} from "./SkillsContext";

type ActiveTaskData = {task:Accessor<ITask>, setTask:(task:ITask)=>void};

export const ActiveTaskContext = createContext<ActiveTaskData>();

interface ActiveTaskProps {
    children?: JSX.Element; // Children elements
}

export function ActiveTaskProvider(props:ActiveTaskProps) {
    const skills = useSkills();
    const [activeTask, setActiveTask] = createSignal(taskBuilder['none']);
    const task:ActiveTaskData = {
        task: activeTask,
        setTask: (task:ITask)=>{
            if (taskMeetsRequirements(task, skills as SkillsData))
            {
                setActiveTask(task);
            }
        },
    };

    return (
        <ActiveTaskContext.Provider value={task}>
            {props.children}
        </ActiveTaskContext.Provider>
    );
}

export default function useActiveTask() { return useContext(ActiveTaskContext) }