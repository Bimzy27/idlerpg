import {Component, For, Show} from "solid-js";
import ItemView from "./ItemView";
import {styled} from "solid-styled-components";
import {backgroundAlt1Color, primaryTrimColor} from "../styles/colors";
import useInventory, {InventoryData} from "../contexts/InventoryContext";
import {ColumnCenterAlignedView, CoreButton, CoreText, RowCenterAlignedView, TransparentButton} from "../styles/styles";
import itemBuilder, {getItemId} from "../data/items/ItemBuilder";
import useEquipment, {EquipmentData} from "../contexts/EquipmentContext";
import {IEquippableItem} from "../models/Item";

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

const StyledSelectedItemView = styled.div`
    width: 20%;
    height: 75%;
    background-color: ${backgroundAlt1Color};
    border-radius: 5px;
    border: 3px solid ${primaryTrimColor};
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    grid-gap: 10px;
`;

const InventoryView: Component<IInventoryProps> = (props) => {
    const inventory= useInventory() as InventoryData;
    const equipment= useEquipment() as EquipmentData;
    return (
        <ColumnCenterAlignedView>
            <CoreText>Inventory</CoreText>
            <RowCenterAlignedView style={{"align-items": "flex-start"}}>
                <StyledInventoryView>
                    <For each={inventory.items}>
                        {(itemAmount, index) => (
                            <TransparentButton style={{width: "fit-content", height: "fit-content"}} onClick={()=>{inventory.setSelectedItem(itemBuilder[itemAmount.id])}}>
                                <ItemView
                                    {...itemAmount}/>
                            </TransparentButton>
                        )}
                    </For>
                </StyledInventoryView>
                <StyledSelectedItemView>
                    <CoreText>Selected Item</CoreText>
                    <CoreText>{inventory.selectedItem().name}</CoreText>
                    <Show when={inventory.selectedItem().name != ''}>
                        <ItemView {...inventory.getItem(getItemId(inventory.selectedItem()))}/>
                        <Show when={'slot' in inventory.selectedItem()}>
                            <CoreButton onClick={()=> {equipment.equip(inventory.selectedItem() as IEquippableItem)}}>Equip</CoreButton>
                        </Show>
                    </Show>
                </StyledSelectedItemView>
            </RowCenterAlignedView>
        </ColumnCenterAlignedView>
    );
};

export default InventoryView;