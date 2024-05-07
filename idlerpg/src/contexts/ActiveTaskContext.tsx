import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";
import {ITask, taskMeetsRequirements} from "../models/Task";
import useSkills, {SkillsData} from "./SkillsContext";
import useInventory, {InventoryData} from "./InventoryContext";
import useCombat, {CombatData} from "./CombatContext";
import {enemyData} from "../loaders/EnemyLoader";
import {getTaskId, taskData} from "../loaders/TaskLoader";

export type ActiveTaskData = {task:Accessor<ITask>, setTask:(task:ITask)=>void};

export const ActiveTaskContext = createContext<ActiveTaskData>();

interface IActiveTaskProps {
    children?: JSX.Element; // Children elements
}

export function ActiveTaskProvider(props:IActiveTaskProps) {
    const skills = useSkills() as SkillsData;
    const inventory = useInventory() as InventoryData;
    const combat = useCombat() as CombatData;
    const [activeTask, setActiveTask] = createSignal(taskData['none']);
    const tasksData:ActiveTaskData = {
        task: activeTask,
        setTask: (task:ITask)=>{
            if (taskMeetsRequirements(task, skills, inventory))
            {
                if (getTaskId(task) !== 'none')
                {
                    combat.setEnemy(enemyData['none'], tasksData);
                }
                setActiveTask(task);
            }
        },
    };

    return (
        <ActiveTaskContext.Provider value={tasksData}>
            {props.children}
        </ActiveTaskContext.Provider>
    );
}

export default function useActiveTask() { return useContext(ActiveTaskContext) }