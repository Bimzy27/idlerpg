import {Component, For, Show} from "solid-js";
import useInventory, {InventoryData} from "../../contexts/InventoryContext";
import useEquipment, {EquipmentData} from "../../contexts/EquipmentContext";
import usePlayer, {PlayerData} from "../../contexts/PlayerContext";
import {
    ContentFitAltView,
    CoreButton,
    CoreText,
} from "../../styles/styles";
import ItemView from "../ItemView";
import {itemData} from "../../loaders/ItemLoader";
import CoinsView from "../CoinsView";
import {IEquippableItem, IFood, IWeapon} from "../../models/Item";
import {styled} from "solid-styled-components";
import {backgroundAlt1Color, primaryTrimColor} from "../../styles/colors";
import {getAttackType} from "../../models/combat/AttackStyle";
import SkillView from "../skills/SkillView";
import RequirementView from "../RequirementView";
import {IDefenseStats} from "../../models/combat/CombatStats";

interface ISelectedItemProps
{

}

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

const SelectedItemView: Component<ISelectedItemProps> = (props) => {
    const inventory= useInventory() as InventoryData;
    const equipment= useEquipment() as EquipmentData;
    const player= usePlayer() as PlayerData;
    return (
        <StyledSelectedItemView>
            <CoreText>Selected Item</CoreText>
            <Show when={inventory.selectedItem() !== 'none'}>
                <ContentFitAltView>
                    <CoreText>{itemData[inventory.selectedItem()].name}</CoreText>
                    <ItemView {...inventory.getItem(inventory.selectedItem())}/>
                </ContentFitAltView>
                <ContentFitAltView>
                    <CoinsView amount={itemData[inventory.selectedItem()].value}/>
                    <CoreButton onClick={()=>
                    {
                        const itemId = inventory.selectedItem();
                        const itemAmount = { id: itemId, amount:1 };
                        inventory.addCoins(itemData[inventory.selectedItem()].value);
                        inventory.removeItem(itemAmount);
                        if (!inventory.hasItem(itemAmount))
                        {
                            inventory.setSelectedItem('none');
                        }
                    }}>Sell</CoreButton>
                </ContentFitAltView>
                <Show when={'slot' in itemData[inventory.selectedItem()]}>
                    <ContentFitAltView>
                        <CoreButton onClick={()=> {equipment.equip(itemData[inventory.selectedItem()] as IEquippableItem)}}>Equip</CoreButton>
                        <Show when={'attackSpeed' in itemData[inventory.selectedItem()]}>
                            <CoreText>Attack Speed: {(itemData[inventory.selectedItem()] as IWeapon).attackSpeed}</CoreText>
                            <CoreText>Attack Type: {getAttackType((itemData[inventory.selectedItem()] as IWeapon).attackType)}</CoreText>
                        </Show>
                        <Show when={(itemData[inventory.selectedItem()] as IEquippableItem).requirements}>
                            <CoreText>  - Requirements -</CoreText>
                            <For each={(itemData[inventory.selectedItem()] as IEquippableItem).requirements}>
                                {(requirement, index) => (<RequirementView requirement={requirement}/>)}
                            </For>
                        </Show>
                        <Show when={(itemData[inventory.selectedItem()] as IEquippableItem).attackStats}>
                            <CoreText>  - Stats -</CoreText>
                            <CoreText>Stab: {(itemData[inventory.selectedItem()] as IEquippableItem).attackStats?.stabBonus}</CoreText>
                            <CoreText>Slash: {(itemData[inventory.selectedItem()] as IEquippableItem).attackStats?.slashBonus}</CoreText>
                            <CoreText>Block: {(itemData[inventory.selectedItem()] as IEquippableItem).attackStats?.blockBonus}</CoreText>
                            <CoreText>Melee Strength: {(itemData[inventory.selectedItem()] as IEquippableItem).attackStats?.meleeStrength}</CoreText>
                        </Show>
                    </ContentFitAltView>
                </Show>
                <Show when={'healing' in itemData[inventory.selectedItem()]}>
                    <ContentFitAltView>
                        <CoreText>Healing: {(itemData[inventory.selectedItem()] as IFood).healing}</CoreText>
                        <CoreButton onClick={()=> {player.setFood(inventory.selectedItem())}}>Equip</CoreButton>
                    </ContentFitAltView>
                </Show>
            </Show>
        </StyledSelectedItemView>
    );
};

export default SelectedItemView;