import {Component, For, Show} from "solid-js";
import ItemView from "../ItemView";
import {styled} from "solid-styled-components";
import {backgroundAlt1Color, primaryTrimColor} from "../../styles/colors";
import useInventory, {InventoryData} from "../../contexts/InventoryContext";
import {
    ColumnCenterAlignedView,
    CoreText,
    RowCenterAlignedView,
    TransparentButton
} from "../../styles/styles";
import useEquipment, {EquipmentData} from "../../contexts/EquipmentContext";
import usePlayer, {PlayerData} from "../../contexts/PlayerContext";
import SelectedItemView from "./SelectedItemView";

interface IInventoryProps
{

}

const StyledInventoryView = styled.div`
    width: 70%;
    height: fit-content;
    background-color: ${backgroundAlt1Color};
    border-radius: 5px;
    border: 3px solid ${primaryTrimColor};
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    grid-gap: 10px;
`;

const InventoryView: Component<IInventoryProps> = (props) => {
    const inventory= useInventory() as InventoryData;
    const equipment= useEquipment() as EquipmentData;
    const player= usePlayer() as PlayerData;
    return (
        <ColumnCenterAlignedView>
            <CoreText>Inventory</CoreText>
            <RowCenterAlignedView style={{"align-items": "flex-start"}}>
                <StyledInventoryView>
                    <For each={inventory.items}>
                        {(itemAmount, index) => (
                            <TransparentButton style={{width: "fit-content", height: "fit-content"}} onClick={()=>{inventory.setSelectedItem(itemAmount.id)}}>
                                <ItemView
                                    {...itemAmount}/>
                            </TransparentButton>
                        )}
                    </For>
                </StyledInventoryView>
                <SelectedItemView/>
            </RowCenterAlignedView>
        </ColumnCenterAlignedView>
    );
};

export default InventoryView;