import {Component, For} from "solid-js";
import {ContentFitAltView, CoreText, RowCenterAlignedView, TransparentButton} from "../styles/styles";
import ItemView from "./ItemView";
import useEquipment, {EquipmentData} from "../contexts/EquipmentContext";
import {EquippableSlot, IEquipSlot} from "../models/Item";

const EquipmentView: Component = (props) => {

    const equipment = useEquipment() as EquipmentData;

    return (
        <ContentFitAltView>
            <CoreText>Equipment</CoreText>
            <div style={{display: "grid", "grid-gap": '10px', "grid-template-columns": 'repeat(3, 1fr)'}}>
                <div/>
                <EquipmentSlotView slot={equipment.getEquipment(EquippableSlot.Head)}/>
                <div/>
                <EquipmentSlotView slot={equipment.getEquipment(EquippableSlot.Cape)}/>
                <EquipmentSlotView slot={equipment.getEquipment(EquippableSlot.Neck)}/>
                <EquipmentSlotView slot={equipment.getEquipment(EquippableSlot.Ammo)}/>
                <EquipmentSlotView slot={equipment.getEquipment(EquippableSlot.MainHand)}/>
                <EquipmentSlotView slot={equipment.getEquipment(EquippableSlot.Torso)}/>
                <EquipmentSlotView slot={equipment.getEquipment(EquippableSlot.OffHand)}/>
                <div/>
                <EquipmentSlotView slot={equipment.getEquipment(EquippableSlot.Legs)}/>
                <div/>
                <EquipmentSlotView slot={equipment.getEquipment(EquippableSlot.Hands)}/>
                <EquipmentSlotView slot={equipment.getEquipment(EquippableSlot.Feet)}/>
                <EquipmentSlotView slot={equipment.getEquipment(EquippableSlot.Ring)}/>
            </div>
        </ContentFitAltView>
    );
};

interface IEquipmentSlotViewProps
{
    slot:IEquipSlot
}

const EquipmentSlotView: Component<IEquipmentSlotViewProps> = (props) => {
    return (
        <TransparentButton style={{width: "fit-content", height: "fit-content"}} onClick={()=>{}}>
            <ItemView id={props.slot.itemId} amount={-1}/>
        </TransparentButton>
    );
};

export default EquipmentView;