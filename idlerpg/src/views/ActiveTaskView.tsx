import {Component, createEffect, createSignal, onMount} from "solid-js";
import {StyledTaskView, TaskProgressBar, TaskProgressBarContainer} from "../styles/styles";
import {useActiveTask} from "../contexts/ActiveTaskContext";
import {useInventory} from "../contexts/InventoryContext";

interface IActiveTaskViewProps
{
}

const ActiveTaskView: Component<IActiveTaskViewProps> = (props) => {
    const [progress, setProgress] = createSignal<number>(0);
    const [duration, setDuration] = createSignal<number>(0);
    const task= useActiveTask();
    const inventory= useInventory();

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
            setProgress(100);

            const intervalId = setInterval(() => {
                setDuration(0);
                if (duration !== 0)
                {
                    setProgress(0);
                }
                clearInterval(intervalId);

                //give rewards
                if (duration !== 0)
                {
                    inventory?.addItem({id:'normal_log', amount: 1})
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
        <StyledTaskView>
            <div>{task?.task().name}</div>
            <TaskProgressBarContainer>
                <TaskProgressBar transitionDuration={duration()} style={`width: ${progress()}%`}></TaskProgressBar>
            </TaskProgressBarContainer>
        </StyledTaskView>
    );
};

export default ActiveTaskView;