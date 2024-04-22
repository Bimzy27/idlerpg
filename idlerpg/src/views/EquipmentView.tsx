import {Component, For} from "solid-js";
import {ContentFitAltView, CoreText, RowCenterAlignedView, TransparentButton} from "../styles/styles";
import itemBuilder from "../data/items/ItemBuilder";
import ItemView from "./ItemView";
import useEquipment, {EquipmentData} from "../contexts/EquipmentContext";

interface IEquipmentViewProps
{
}

const EquipmentView: Component<IEquipmentViewProps> = (props) => {

    const equipment = useEquipment() as EquipmentData;

    return (
        <ContentFitAltView>
            <CoreText>Equipment</CoreText>
            <RowCenterAlignedView>
                <For each={equipment.equipment}>
                    {(equipSlot, index) => (
                        <TransparentButton style={{width: "fit-content", height: "fit-content"}} onClick={()=>{}}>
                            <ItemView id={equipSlot.itemId} amount={1}/>
                        </TransparentButton>
                    )}
                </For>
            </RowCenterAlignedView>
        </ContentFitAltView>
    );
};

export default EquipmentView;