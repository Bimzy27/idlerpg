import {Component, For} from "solid-js";
import ItemView from "./ItemView";
import {styled} from "solid-styled-components";
import {backgroundAlt1Color, primaryTrimColor, transparentColor} from "../styles/colors";
import useInventory from "../contexts/InventoryContext";

interface IInventoryProps
{

}

const StyledInventoryView = styled.div`
    width: 90%;
    height: fit-content;
    background-color: ${backgroundAlt1Color};
    border-radius: 5px;
    border: 3px solid ${primaryTrimColor};
    box-sizing: border-box;
    display: grid;
    grid-gap: 10px;
    padding: 10px;
`;

const InventoryView: Component<IInventoryProps> = (props) => {
    const inventory= useInventory();
    return (
        <StyledInventoryView>
            <For each={inventory?.items}>
                {(itemView, index) => (
                    <ItemView
                        {...itemView}
                    />
                )}
            </For>
        </StyledInventoryView>
    );
};

export default InventoryView;