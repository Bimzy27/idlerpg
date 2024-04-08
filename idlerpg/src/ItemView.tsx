import {Component, Show} from "solid-js";
import {CoreText, FullImage, StyledItemView} from "./styles/styles";
import {IItemAmount} from "./models/Item";

interface IItemViewProps extends IItemAmount {
    update: (id: string, amount: number, direction?: boolean) => void;
}

const ItemView: Component<IItemViewProps> = (props) => {
    return (
        <StyledItemView>
            <Show when={props.id != ''} fallback={null} children={
                <FullImage src={`/assets/items/${props.id}.png`} alt="NO IMG"></FullImage>
            }/>
            <CoreText style={{"margin-bottom": 'auto'}}>{props.amount}</CoreText>
            <button style={{height: '20%', width: '100%', display: 'flex'}}
                    onClick={() => props.update(props.id, 2, true)}>{props.id} 2x
            </button>
        </StyledItemView>
    );
};


export default ItemView;