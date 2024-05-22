import {IItemAmount} from "../models/Item";
import {Component, Show} from "solid-js";
import {CoreImage, CoreText} from "../styles/styles";
import {styled} from "solid-styled-components";
import {backgroundAlt2Color, primaryTrimColor} from "../styles/colors";

const StyledItemView = styled.div`
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

interface IItemViewProps extends IItemAmount {
    forceDisplayAmount?:boolean
}

const ItemView: Component<IItemViewProps> = (props) => {
    return (
        <StyledItemView style={{position: 'relative'}}>
            <Show when={props.id != ''} fallback={null} children={
                <CoreImage src={`/assets/items/${props.id}.png`} alt="NO IMG" width={60} height={60}></CoreImage>
            }/>
            <Show when={props.amount >= 0 || props.forceDisplayAmount}>
                <CoreText style={{'position': 'absolute', 'top': '55%', 'z-index': 1, 'text-align': 'center'}}>{props.amount < 0 ? 0 : props.amount}</CoreText>
            </Show>
        </StyledItemView>
    );
};

export default ItemView;