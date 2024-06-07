import {Component, For} from "solid-js";
import {ColumnCenterAlignedView, ContentFitAltView, ContentFitView, CoreButton, CoreText} from "../styles/styles";
import vendorBuilder from "../data/VendorBuilder";
import {IVendorItem} from "../models/Vendor";
import useInventory, {InventoryData} from "../contexts/InventoryContext";
import ItemView from "./ItemView";

interface IVendorViewProps {
    id:string
}

const VendorView: Component<IVendorViewProps> = (props) => {
    const vendor = vendorBuilder[props.id];

    return (
        <ContentFitView>
            <ColumnCenterAlignedView>
                <CoreText>{vendor.name}</CoreText>
                <For each={vendor.items}>
                    {(vendorItem:IVendorItem, index) => (<VendorItemView vendorItem={vendorItem}/>)}
                </For>
            </ColumnCenterAlignedView>
        </ContentFitView>
    );
};

interface IVendorItemViewProps {
    vendorItem:IVendorItem
}

const VendorItemView: Component<IVendorItemViewProps> = (props) => {
    const inventory = useInventory() as InventoryData;

    return (
        <ContentFitAltView>
            <ColumnCenterAlignedView>
                <CoreText>Cost: {props.vendorItem.cost}</CoreText>
                <ItemView amount={props.vendorItem.item.amount} id={props.vendorItem.item.id}/>
                <CoreButton onClick={()=>
                {
                    if (inventory.hasCoins(props.vendorItem.cost))
                    {
                        inventory.addItem(props.vendorItem.item);
                        inventory.removeCoins(props.vendorItem.cost);
                    }
                }}>Buy</CoreButton>
            </ColumnCenterAlignedView>
        </ContentFitAltView>
    );
};

export default VendorView;