import {Component, createEffect, createSignal, For, Show} from "solid-js";
import {ColumnCenterAlignedView, CoreText, RowCenterAlignedView} from "../../styles/styles";
import useActiveTask, {ActiveTaskData} from "../../contexts/ActiveTaskContext";
import useInventory, {InventoryData} from "../../contexts/InventoryContext";
import {IReward, ItemReward, SkillReward} from "../../models/Reward";
import useSkills, {SkillsData} from "../../contexts/SkillsContext";
import {ITask} from "../../models/Task";
import {ICost, ItemCost} from "../../models/Cost";
import {styled} from "solid-styled-components";
import {highlightColor, primaryColor, secondaryColor} from "../../styles/colors";
import {TaskImage} from "../TaskView";
import {getTaskId, taskData} from "../../loaders/TaskLoader";
import {meetsRequirements} from "../../models/Requirement";
import RewardView from "../RewardView";

const TaskProgressBarContainer = styled.div`
    width: 90%;
    height: 35px;
    background-color: ${highlightColor};
    border-radius: 10px;
    margin-bottom: 5px;
`;

const TaskProgressBar = styled.div<{transitionDuration: number}>`
    height: 100%;
    background-color: ${primaryColor};
    transition: width ${props => props.transitionDuration}s linear;
    border-radius: 10px;
`;

interface IActiveTaskViewProps
{
}

const ActiveTaskView: Component<IActiveTaskViewProps> = (props) => {
    const [progress, setProgress] = createSignal<number>(0);
    const [duration, setDuration] = createSignal<number>(0);
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
                setDuration(activeTask.intervalSeconds);
                setProgress(100);

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

                    setDuration(0);
                    setProgress(0);
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

        setDuration(0);
        setProgress(0);
        if (activeTask.intervalSeconds !== 0)
        {
            startTask();
        }

        return () => {
        };
    }, [task]);

    return (
        <ColumnCenterAlignedView>
            <div style={{'display': "flex", "flex-direction": 'row', "grid-gap": '15px', "align-items": "center"}}>
                <Show when={task.task() && task.task().intervalSeconds !== 0}>
                    <TaskImage taskId={getTaskId(task.task())} width={50} height={50}/>
                    <CoreText>{task.task().name}</CoreText>
                    <For each={task.task().rewards}>
                        {(reward, index) => (<RewardView reward={reward}/>)}
                    </For>
                </Show>
            </div>
            <TaskProgressBarContainer>
                <TaskProgressBar transitionDuration={duration()} style={`width: ${progress()}%`}></TaskProgressBar>
            </TaskProgressBarContainer>
        </ColumnCenterAlignedView>
    );
};

export default ActiveTaskView;