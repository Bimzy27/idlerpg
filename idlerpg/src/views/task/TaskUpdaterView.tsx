import {Component, createEffect} from "solid-js";
import useInventory, {InventoryData} from "../../contexts/InventoryContext";
import useSkills, {SkillsData} from "../../contexts/SkillsContext";
import useActiveTask, {ActiveTaskData} from "../../contexts/ActiveTaskContext";
import {ITask} from "../../models/Task";
import {IReward, ItemReward, SkillReward} from "../../models/Reward";
import {ICost, ItemCost} from "../../models/Cost";
import {meetsRequirements} from "../../models/Requirement";
import {taskData} from "../../loaders/TaskLoader";

interface ITaskUpdaterViewProps
{
}

const TaskUpdaterView: Component<ITaskUpdaterViewProps> = (props) => {
    const inventory= useInventory() as InventoryData;
    const skills= useSkills() as SkillsData;
    const task = useActiveTask() as ActiveTaskData;

    const timeoutIds:NodeJS.Timeout[] = [];

    createEffect(() => {
        const activeTask:ITask = task.task() as ITask;

        function startTask()
        {
            // Cleanup function
            for (const id of timeoutIds) {
                clearInterval(id);
            }
            timeoutIds.length = 0;

            const timeoutId1 = setTimeout(()=>
            {
                task.setTaskDuration(activeTask.intervalSeconds);
                task.setTaskProgress(100);

                const timeoutId2 = setTimeout(()=>
                {
                    //give rewards
                    const rewards:IReward[] = task?.task().rewards as IReward[];
                    for (let i = 0; i < rewards.length; i++) {
                        if (rewards[i] instanceof ItemReward)
                        {
                            rewards[i].reward(inventory);
                        }
                        else if (rewards[i] instanceof SkillReward)
                        {
                            rewards[i].reward(skills);
                        }
                    }
                    //consume costs
                    const costs:ICost[] = task?.task().costs as ICost[];
                    for (let i = 0; i < costs.length; i++) {
                        if (costs[i] instanceof ItemCost)
                        {
                            costs[i].consume(inventory);
                        }
                    }

                    task.setTaskDuration(0);
                    task.setTaskProgress(0);
                    const timeoutId3 = setTimeout(()=>
                    {
                        if (meetsRequirements(activeTask.requirements, skills, inventory))
                        {
                            startTask();
                        }
                        else
                        {
                            task.setTask(taskData['none']);
                        }
                    }, 10);
                    timeoutIds.push(timeoutId3)
                }, activeTask.intervalSeconds * 1000)
                timeoutIds.push(timeoutId2);
            }, 10);
            timeoutIds.push(timeoutId1);
        }

        task.setTaskDuration(0);
        task.setTaskProgress(0);
        if (activeTask.intervalSeconds !== 0)
        {
            startTask();
        }

        return () => {
        };
    }, [task]);

    return (
        <div/>
    );
};

export default TaskUpdaterView;