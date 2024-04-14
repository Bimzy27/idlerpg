import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";
import {ITask, taskMeetsRequirements} from "../models/Task";
import taskBuilder from "../data/tasks/TaskBuilder";
import useSkills, {SkillsData} from "./SkillsContext";
import useInventory, {InventoryData} from "./InventoryContext";

export type ActiveTaskData = {task:Accessor<ITask>, setTask:(task:ITask)=>void};

export const ActiveTaskContext = createContext<ActiveTaskData>();

interface IActiveTaskProps {
    children?: JSX.Element; // Children elements
}

export function ActiveTaskProvider(props:IActiveTaskProps) {
    const skills = useSkills();
    const inventory = useInventory();
    const [activeTask, setActiveTask] = createSignal(taskBuilder['none']);
    const task:ActiveTaskData = {
        task: activeTask,
        setTask: (task:ITask)=>{
            if (taskMeetsRequirements(task, skills as SkillsData, inventory as InventoryData))
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