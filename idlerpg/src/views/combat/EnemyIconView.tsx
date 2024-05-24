import {Component, Show} from "solid-js";
import {CoreImage, CoreText} from "../../styles/styles";
import {styled} from "solid-styled-components";
import {backgroundAlt2Color, primaryTrimColor} from "../../styles/colors";
import {IEnemyAmount} from "../../models/combat/Enemy";

const StyledEnemyIconView = styled.div`
    width: 100px;
    height: 100px;
    background-color: ${backgroundAlt2Color};
    border-radius: 5px;
    border: 3px solid ${primaryTrimColor};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

interface IEnemyIconViewProps extends IEnemyAmount {
    showAmount:boolean,
}

const EnemyIconView: Component<IEnemyIconViewProps> = (props) => {
    return (
        <StyledEnemyIconView style={{position: 'relative'}}>
            <Show when={props.id != ''} fallback={null} children={
                <CoreImage src={`/assets/enemies/${props.id}.png`} alt="NO IMG" width={60} height={60}></CoreImage>
            }/>
            <Show when={props.showAmount}>
                <CoreText style={{'position': 'absolute', 'top': '55%', 'z-index': 1, 'text-align': 'center'}}>{props.amount < 0 ? 0 : props.amount}</CoreText>
            </Show>
        </StyledEnemyIconView>
    );
};

export default EnemyIconView;