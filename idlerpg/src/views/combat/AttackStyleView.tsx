import {Component, Show} from "solid-js";
import useCombat, {CombatData} from "../../contexts/CombatContext";
import {ColumnCenterAlignedView, ContentFitAltView, CoreImage, CoreText, TransparentButton} from "../../styles/styles";
import useEquipment, {EquipmentData} from "../../contexts/EquipmentContext";
import {EquippableSlot, IWeapon} from "../../models/Item";
import {CombatType, IAttackStyle} from "../../models/combat/AttackStyle";
import itemBuilder from "../../data/items/ItemBuilder";
import {
    backgroundAlt1Color,
    primaryTrimColor,
} from "../../styles/colors";
import {styled} from "solid-styled-components";

interface IAttackStyleViewProps
{
}

const AttackStyleView: Component<IAttackStyleViewProps> = (props) => {
    const combat = useCombat() as CombatData;
    const equipment = useEquipment() as EquipmentData;

    function weaponStyle():CombatType
    {
        const weaponId = equipment.getEquipment(EquippableSlot.MainHand).itemId;
        if (weaponId === 'none' || weaponId === '')
        {
            //is fists
            return CombatType.Melee;
        }

        return (itemBuilder[weaponId] as IWeapon).combatType;
    }

    return (
        <ColumnCenterAlignedView>
            <CoreText>Attack Style</CoreText>
            <ContentFitAltView>
                <ColumnCenterAlignedView>
                    <Show when={ weaponStyle() === CombatType.Melee }>
                        <AttackStyleButtonView attackStyle={{
                            name: 'Stab',
                            attackInterval: 1.5,
                            expPerHit: [{ id: 'attack', exp: 0.4}, { id: 'hitpoints', exp: 0.133}]
                        }}/>
                        <AttackStyleButtonView attackStyle={{
                            name: 'Slash',
                            attackInterval: 1.5,
                            expPerHit: [{ id: 'strength', exp: 0.4}, { id: 'hitpoints', exp: 0.133}]
                        }}/>
                        <AttackStyleButtonView attackStyle={{
                            name: 'Block',
                            attackInterval: 1.5,
                            expPerHit: [{ id: 'defense', exp: 0.4}, { id: 'hitpoints', exp: 0.133}]
                        }}/>
                    </Show>
                </ColumnCenterAlignedView>
            </ContentFitAltView>
        </ColumnCenterAlignedView>
    );
};

interface IAttackStyleButtonViewProps
{
    attackStyle:IAttackStyle;
}

const StyledAttackStyleButtonView = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-left: 10px;
`;

const AttackStyleButtonView: Component<IAttackStyleButtonViewProps> = (props) => {
    const combat = useCombat() as CombatData;
    return (
        <TransparentButton onClick={()=>{combat.setAttackStyle(props.attackStyle)}} style={{"background-color": `${combat.attackStyle().name == props.attackStyle.name ? primaryTrimColor : backgroundAlt1Color}`, "border-radius": '5px'}}>
            <StyledAttackStyleButtonView>
                <CoreImage src={`/assets/attackStyles/${props.attackStyle.name.toLowerCase()}.png`} alt="NO IMG" width={35} height={35}></CoreImage>
                <CoreText style={{"padding-left": '10px', "padding-right": '10px'}}>{props.attackStyle.name}</CoreText>
            </StyledAttackStyleButtonView>
        </TransparentButton>
    );
};

export default AttackStyleView;