import {Component, Show} from "solid-js";
import {backgroundAltColor} from "./styles/colors";
import {StyledItemView} from "./styles/styles";

export interface IItemAmount
{
    name:string;
    amount:number;
}

interface IItemViewProps extends IItemAmount {
    update: (id: string, amount: number, direction?: boolean) => void;
}

const ItemView: Component<IItemViewProps> = props => (
    <StyledItemView>
        <Show when={props.name != ''}
              fallback={null}
              children={
                  <image src="/assets/items/oakLog.png"></image>
              }/>
        <text style={{marginTop: 'auto'}}>{props.amount}</text>
        <button style={{ height: '20%', width: '100%', display: 'flex' }} onClick={()=> props.update('oakLog', 2, true)}>Oak Log 2x</button>
    </StyledItemView>
);

export default ItemView;