import {Component} from "solid-js";
import {CoreImage, CoreText} from "../styles/styles";
import {styled} from "solid-styled-components";
import {backgroundAlt2Color, primaryTrimColor} from "../styles/colors";

const StyledExpView = styled.div`
    width: 60px;
    height: 60px;
    background-color: ${backgroundAlt2Color};
    border-radius: 5px;
    border: 3px solid ${primaryTrimColor};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
`;

interface IIntervalViewProps {
    interval:number;
}

const IntervalView: Component<IIntervalViewProps> = (props) => {
    return (
        <StyledExpView style={{position: 'relative'}}>
            <CoreImage src={`/assets/ui/interval.png`} alt="NO IMG" width={40} height={40}></CoreImage>
            <CoreText style={{'position': 'absolute', 'top': '35%', 'z-index': 1, 'text-align': 'center', "font-size": '20px'}}>{props.interval}s</CoreText>
        </StyledExpView>
    );
};

export default IntervalView;