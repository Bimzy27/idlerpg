import {Component, For} from "solid-js";
import useCombat, {CombatData} from "../../contexts/combat/CombatContext";
import {ColumnCenterAlignedView, ContentFitAltView, CoreButton, CoreText, TransparentButton} from "../../styles/styles";
import {styled} from "solid-styled-components";
import {backgroundAlt1Color, primaryTrimColor} from "../../styles/colors";
import ItemView from "../ItemView";

const LootContainer = styled.div`
    width: 90%;
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

interface ILootViewProps
{
}

const LootView: Component<ILootViewProps> = (props) => {
    const combat = useCombat() as CombatData;

    return (
        <ContentFitAltView style={{width: '100%'}}>
            <ColumnCenterAlignedView>
                <CoreText>Loot</CoreText>
                <CoreButton onClick={combat.lootAll}>Loot All</CoreButton>
                <LootContainer>
                    <For each={combat.loot}>
                        {(item, index) => (
                            <ItemView id={item.id} amount={item.amount}/>
                        )}
                    </For>
                </LootContainer>
            </ColumnCenterAlignedView>
        </ContentFitAltView>
    );
};

export default LootView;