import {Component, For, Show} from "solid-js";
import ItemView from "../ItemView";
import {styled} from "solid-styled-components";
import {backgroundAlt1Color, primaryTrimColor} from "../../styles/colors";
import useInventory, {InventoryData} from "../../contexts/InventoryContext";
import {
    ColumnCenterAlignedView, ContentFitAltView, ContentFitView,
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
    box-sizing: border-box;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    grid-gap: 5px;
`;

const InventoryView: Component<IInventoryProps> = (props) => {
    const inventory= useInventory() as InventoryData;

    return (
        <RowCenterAlignedView style={{"align-items": "flex-start"}}>
            <ContentFitView>
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
            </ContentFitView>
            <SelectedItemView/>
        </RowCenterAlignedView>
    );
};

export default InventoryView;