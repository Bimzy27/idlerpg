import {styled} from "solid-styled-components";
import {highlightColor, primaryColor} from "../../styles/colors";
import {Component, createSignal} from "solid-js";

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

interface IActiveCombatViewProps
{
}

const ActiveCombatView : Component<IActiveCombatViewProps> = (props) => {
    const [progress, setProgress] = createSignal<number>(0);
    const [duration, setDuration] = createSignal<number>(0);

    return (
        <div>
            <TaskProgressBarContainer>
                <TaskProgressBar transitionDuration={duration()} style={`width: ${progress()}%`}></TaskProgressBar>
            </TaskProgressBarContainer>
        </div>
    );
};

export default ActiveCombatView;