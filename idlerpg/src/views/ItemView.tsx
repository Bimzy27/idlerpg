import {IItemAmount} from "../models/Item";
import {Component, Show} from "solid-js";
import {CoreImage, CoreText, CoreText_Mid, StyledItemView} from "../styles/styles";

interface IItemViewProps extends IItemAmount {
}

const ItemView: Component<IItemViewProps> = (props) => {
    return (
        <StyledItemView>
            <Show when={props.id != ''} fallback={null} children={
                <CoreImage src={`/assets/items/${props.id}.png`} alt="NO IMG" width={80} height={80}></CoreImage>
            }/>
            <CoreText>{props.amount}</CoreText>
        </StyledItemView>
    );
};


export default ItemView;