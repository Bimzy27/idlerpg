import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";
import {ITask} from "../models/Task";
import useSkills, {SkillsData} from "./SkillsContext";
import useInventory, {InventoryData} from "./InventoryContext";
import useCombat, {CombatData} from "./combat/CombatContext";
import {enemyData} from "../loaders/EnemyLoader";
import {getTaskId, taskData} from "../loaders/TaskLoader";
import {meetsRequirements} from "../models/Requirement";

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
            if (meetsRequirements(task.requirements, skills, inventory))
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