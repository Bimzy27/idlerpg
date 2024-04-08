import {Component, For} from "solid-js";
import ItemView from "./ItemView";
import {createStore} from "solid-js/store";
import {CoreText} from "./styles/styles";
import {styled} from "solid-styled-components";
import {primaryTrimColor, transparentColor} from "./styles/colors";
import {IItemAmount} from "./models/Item";

const initialInventory:IItemAmount[] = [
    {id:'oakLog', amount:5},
    {id:'bronzeArrow', amount:0},
    {id:'normalLog', amount:100},
];

const emptyItemAmount = {id:'', amount:0};

interface IInventoryProps
{

}

const StyledInventoryView = styled.div`
    width: fit-content;
    height: fit-content;
    background-color: ${transparentColor};
    border-radius: 5px;
    border: 3px solid ${primaryTrimColor};
    box-sizing: border-box;
    display: grid;
    grid-gap: 10px;
    padding: 10px;
`;

const InventoryView: Component<IInventoryProps> = (props) => {
    const [inventory, setInventory] = createStore<IItemAmount[]>(initialInventory);

    const updateInventory = (id: string, amount: number, increment = true): void => {
        const direction:1|-1 = increment ? 1 : -1;
        const currentItem: IItemAmount | undefined = inventory.find(item => item.id === id);
        if (currentItem)
        {
            //Has existing item
            let finalAmount = Math.max(0, currentItem.amount + (amount * direction))
            setInventory(item => item.id === id, 'amount', finalAmount);
            if (finalAmount == 0)
            {
                setInventory(item => item.id === id, 'id', '');
            }
        }
        else
        {
            //Add new item
        }
        //TODO remove items when they reach 0 amount
    };

    return (
        <StyledInventoryView>
            <For each={inventory} children={(item, index) => {
                return <CoreText>hello</CoreText>
            }}>
                {(itemView, index) => (
                    <ItemView
                        {...itemView}
                        update={updateInventory}
                    />
                )}
            </For>
        </StyledInventoryView>
    );
};

export default InventoryView;