import {Component, Show} from "solid-js";
import useCombat, {CombatData} from "../../contexts/CombatContext";
import {ColumnCenterAlignedView, ContentFitAltView, CoreImage, CoreText, TransparentButton} from "../../styles/styles";
import useEquipment, {EquipmentData} from "../../contexts/EquipmentContext";
import {EquippableSlot, IWeapon} from "../../models/Item";
import {AttackStyle, AttackType, IAttackStyle} from "../../models/combat/AttackStyle";
import {
    backgroundAlt1Color,
    primaryTrimColor,
} from "../../styles/colors";
import {styled} from "solid-styled-components";
import {itemData} from "../../loaders/ItemLoader";

interface IAttackStyleViewProps
{
}

const AttackStyleView: Component<IAttackStyleViewProps> = (props) => {
    const combat = useCombat() as CombatData;
    const equipment = useEquipment() as EquipmentData;

    function weaponStyle():AttackType
    {
        const weaponId = equipment.getEquipment(EquippableSlot.MainHand).itemId;
        if (weaponId === 'none' || weaponId === '')
        {
            //is fists
            return AttackType.Melee;
        }

        return (itemData[weaponId] as IWeapon).attackType;
    }

    return (
        <ColumnCenterAlignedView>
            <CoreText>Attack Style</CoreText>
            <ContentFitAltView>
                <ColumnCenterAlignedView>
                    <Show when={ weaponStyle() === AttackType.Melee }>
                        <AttackStyleButtonView attackStyle={{
                            attackStyle: AttackStyle.stab,
                            expPerHit: [{ id: 'attack', exp: 0.4}, { id: 'hitpoints', exp: 0.133}]
                        }}/>
                        <AttackStyleButtonView attackStyle={{
                            attackStyle: AttackStyle.slash,
                            expPerHit: [{ id: 'strength', exp: 0.4}, { id: 'hitpoints', exp: 0.133}]
                        }}/>
                        <AttackStyleButtonView attackStyle={{
                            attackStyle: AttackStyle.block,
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
        <TransparentButton onClick={()=>{combat.setAttackStyle(props.attackStyle)}} style={{"background-color": `${combat.attackStyle().attackStyle == props.attackStyle.attackStyle ? primaryTrimColor : backgroundAlt1Color}`, "border-radius": '5px'}}>
            <StyledAttackStyleButtonView>
                <CoreImage src={`/assets/attackStyles/${props.attackStyle.attackStyle.toLowerCase()}.png`} alt="NO IMG" width={35} height={35}></CoreImage>
                <CoreText style={{"padding-left": '10px', "padding-right": '10px'}}>{props.attackStyle.attackStyle.toString()}</CoreText>
            </StyledAttackStyleButtonView>
        </TransparentButton>
    );
};

export default AttackStyleView;