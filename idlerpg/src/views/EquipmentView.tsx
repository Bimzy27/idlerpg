import {Component, For} from "solid-js";
import {CoreText, TransparentButton} from "../styles/styles";
import itemBuilder from "../data/items/ItemBuilder";
import ItemView from "./ItemView";
import useEquipment, {EquipmentData} from "../contexts/EquipmentContext";

interface IEquipmentViewProps
{
}

const EquipmentView: Component<IEquipmentViewProps> = (props) => {

    const equipment = useEquipment() as EquipmentData;

    return (
        <div>
            <For each={equipment.equipment}>
                {(equipSlot, index) => (
                    <TransparentButton style={{width: "fit-content", height: "fit-content"}} onClick={()=>{}}>
                        <ItemView id={equipSlot.itemId} amount={1}/>
                    </TransparentButton>
                )}
            </For>
        </div>
    );
};

export default EquipmentView;