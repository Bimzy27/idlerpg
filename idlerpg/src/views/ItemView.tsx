import {IItemAmount} from "../models/Item";
import {Component, Show} from "solid-js";
import {CoreText, FullImage, StyledItemView} from "../styles/styles";

interface IItemViewProps extends IItemAmount {
}

const ItemView: Component<IItemViewProps> = (props) => {
    return (
        <StyledItemView>
            <Show when={props.id != ''} fallback={null} children={
                <FullImage src={`/assets/items/${props.id}.png`} alt="NO IMG"></FullImage>
            }/>
            <CoreText style={{"margin-bottom": 'auto'}}>{props.amount}</CoreText>
        </StyledItemView>
    );
};


export default ItemView;