import {Component, createEffect, createSignal, onMount, Show} from "solid-js";
import {CoreImage, CoreText, StyledActiveTaskView, TaskProgressBar, TaskProgressBarContainer} from "../styles/styles";
import useActiveTask from "../contexts/ActiveTaskContext";
import useInventory from "../contexts/InventoryContext";
import {IReward, ItemReward, SkillReward} from "../models/Reward";
import taskBuilder, {getTaskId} from "../data/TaskBuilder";
import useSkills from "../contexts/SkillsContext";

interface IActiveTaskViewProps
{
}

const ActiveTaskView: Component<IActiveTaskViewProps> = (props) => {
    const [progress, setProgress] = createSignal<number>(0);
    const [duration, setDuration] = createSignal<number>(0);
    const task= useActiveTask();
    const inventory= useInventory();
    const skills= useSkills();

    function getDuration():number {
        if (task) {
            return task?.task().durationSeconds;
        }
        return 0;
    }

    createEffect(() => {
        function beginInterval()
        {
            const duration = getDuration();
            setDuration(duration);
            if (duration !== 0)
            {
                setProgress(100);
            }

            const intervalId = setInterval(() => {
                setDuration(0);
                if (duration !== 0)
                {
                    setProgress(0);
                }
                clearInterval(intervalId);

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

                const offsetIntervalId = setInterval(() => {
                    clearInterval(offsetIntervalId);
                    beginInterval()
                }, 5);
            }, duration * 1000);
        }

        onMount(() => {
            beginInterval();
        });

        return () => {
        };
    });

    return (
        <StyledActiveTaskView>
            <div style={{'display': "flex", "flex-direction": 'row', "grid-gap": '15px'}}>
                <Show when={task?.task() && task?.task().durationSeconds !== 0}>
                    <CoreImage src={`/assets/tasks/${getTaskId(task?.task())}.png`} alt="NO IMG" width={50} height={50}/>
                </Show>
                <CoreText>{task?.task().name}</CoreText>
            </div>
            <TaskProgressBarContainer>
                <TaskProgressBar transitionDuration={duration()} style={`width: ${progress()}%`}></TaskProgressBar>
            </TaskProgressBarContainer>
        </StyledActiveTaskView>
    );
};

export default ActiveTaskView;