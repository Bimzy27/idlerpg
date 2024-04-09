import {IItemAmount} from "../models/Item";
import {Component, Show} from "solid-js";
import {CoreImage, CoreText, CoreText_Mid, StyledItemView} from "../styles/styles";

interface IItemViewProps extends IItemAmount {
}

const ItemView: Component<IItemViewProps> = (props) => {
    return (
        <StyledItemView style={{position: 'relative'}}>
            <Show when={props.id != ''} fallback={null} children={
                <CoreImage src={`/assets/items/${props.id}.png`} alt="NO IMG" width={80} height={80}></CoreImage>
            }/>
            <CoreText style={{'position': 'absolute', 'top': '40%', 'z-index': 1, 'text-align': 'center'}}>{props.amount}</CoreText>
        </StyledItemView>
    );
};


export default ItemView;