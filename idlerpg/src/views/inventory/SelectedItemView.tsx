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

    function hasAttackStats():boolean
    {
        const attackStats = (itemData[inventory.selectedItem()] as IEquippableItem).attackStats;
        if (attackStats)
        {
            if (attackStats.stabBonus && attackStats.stabBonus !== 0)
            {
                return true;
            }
            if (attackStats.slashBonus && attackStats.slashBonus !== 0)
            {
                return true;
            }
            if (attackStats.blockBonus && attackStats.blockBonus !== 0)
            {
                return true;
            }
            if (attackStats.rangedBonus && attackStats.rangedBonus !== 0)
            {
                return true;
            }
            if (attackStats.magicBonus && attackStats.magicBonus !== 0)
            {
                return true;
            }

            if (attackStats.meleeStrength && attackStats.meleeStrength !== 0)
            {
                return true;
            }
            if (attackStats.rangedStrength && attackStats.rangedStrength !== 0)
            {
                return true;
            }
            if (attackStats.magicStrength && attackStats.magicStrength !== 0)
            {
                return true;
            }
        }
        return false;
    }

    function hasDefenseStats():boolean
    {
        const defenseStats = (itemData[inventory.selectedItem()] as IEquippableItem).defenseStats;
        if (defenseStats)
        {
            if (defenseStats.meleeDefense && defenseStats.meleeDefense !== 0)
            {
                return true;
            }
            if (defenseStats.rangedDefense && defenseStats.rangedDefense !== 0)
            {
                return true;
            }
            if (defenseStats.magicDefense && defenseStats.magicDefense !== 0)
            {
                return true;
            }
            if (defenseStats.damageReduction && defenseStats.damageReduction !== 0)
            {
                return true;
            }
        }
        return false;
    }

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
                        <Show when={hasAttackStats()}>
                            <CoreText>  - Attack Stats -</CoreText>
                            <CoreText>Stab: {(itemData[inventory.selectedItem()] as IEquippableItem).attackStats?.stabBonus}</CoreText>
                            <CoreText>Slash: {(itemData[inventory.selectedItem()] as IEquippableItem).attackStats?.slashBonus}</CoreText>
                            <CoreText>Block: {(itemData[inventory.selectedItem()] as IEquippableItem).attackStats?.blockBonus}</CoreText>
                            <CoreText>Ranged: {(itemData[inventory.selectedItem()] as IEquippableItem).attackStats?.rangedBonus}</CoreText>
                            <CoreText>Magic: {(itemData[inventory.selectedItem()] as IEquippableItem).attackStats?.magicBonus}</CoreText>
                            <CoreText>Melee Strength: {(itemData[inventory.selectedItem()] as IEquippableItem).attackStats?.meleeStrength}</CoreText>
                            <CoreText>Ranged Strength: {(itemData[inventory.selectedItem()] as IEquippableItem).attackStats?.rangedStrength}</CoreText>
                            <CoreText>Magic Strength: {(itemData[inventory.selectedItem()] as IEquippableItem).attackStats?.magicStrength}</CoreText>
                        </Show>
                        <Show when={hasDefenseStats()}>
                            <CoreText>  - Defense Stats -</CoreText>
                            <CoreText>Melee: {(itemData[inventory.selectedItem()] as IEquippableItem).defenseStats?.meleeDefense}</CoreText>
                            <CoreText>Ranged: {(itemData[inventory.selectedItem()] as IEquippableItem).defenseStats?.rangedDefense}</CoreText>
                            <CoreText>Magic: {(itemData[inventory.selectedItem()] as IEquippableItem).defenseStats?.magicDefense}</CoreText>
                            <CoreText>Damage Reduction: {(itemData[inventory.selectedItem()] as IEquippableItem).defenseStats?.damageReduction}</CoreText>
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