import {Accessor, createContext, createSignal, JSX, useContext} from "solid-js";
import {ITask, taskMeetsRequirements} from "../models/Task";
import taskBuilder, {getTaskId} from "../data/tasks/TaskBuilder";
import useSkills, {SkillsData} from "./SkillsContext";
import useInventory, {InventoryData} from "./InventoryContext";
import useCombat, {CombatData} from "./CombatContext";
import enemyBuilder from "../data/EnemyBuilder";

export type ActiveTaskData = {task:Accessor<ITask>, setTask:(task:ITask)=>void};

export const ActiveTaskContext = createContext<ActiveTaskData>();

interface IActiveTaskProps {
    children?: JSX.Element; // Children elements
}

export function ActiveTaskProvider(props:IActiveTaskProps) {
    const skills = useSkills() as SkillsData;
    const inventory = useInventory() as InventoryData;
    const combat = useCombat() as CombatData;
    const [activeTask, setActiveTask] = createSignal(taskBuilder['none']);
    const taskData:ActiveTaskData = {
        task: activeTask,
        setTask: (task:ITask)=>{
            if (taskMeetsRequirements(task, skills, inventory))
            {
                if (getTaskId(task) !== 'none')
                {
                    combat.setEnemy(enemyBuilder['none'], taskData);
                }
                setActiveTask(task);
            }
        },
    };

    return (
        <ActiveTaskContext.Provider value={taskData}>
            {props.children}
        </ActiveTaskContext.Provider>
    );
}

export default function useActiveTask() { return useContext(ActiveTaskContext) }