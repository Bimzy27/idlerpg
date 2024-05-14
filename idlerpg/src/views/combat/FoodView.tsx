import {Component} from "solid-js";
import {ColumnCenterAlignedView, ContentFitAltView, CoreButton, CoreText} from "../../styles/styles";
import ItemView from "../ItemView";
import usePlayer, {PlayerData} from "../../contexts/PlayerContext";
import {IFood} from "../../models/Item";
import useInventory, {InventoryData} from "../../contexts/InventoryContext";
import {itemData} from "../../loaders/ItemLoader";

interface IFoodViewProps
{
}

const FoodView: Component<IFoodViewProps> = (props) => {
    const inventory = useInventory() as InventoryData;
    const player = usePlayer() as PlayerData;

    function getHealing():number
    {
        if (player.food() !== 'none' && player.food() !== '')
        {
            return (itemData[player.food()] as IFood).healing * 10;
        }
        else
        {
            return -1;
        }
    }

    return (
        <ContentFitAltView style={{width: '100%'}}>
            <ColumnCenterAlignedView>
                <CoreText>Food</CoreText>
                    <ItemView amount={inventory.getItem(player.food()).amount} id={player.food()}/>
                    <CoreText>Healing: {getHealing()}</CoreText>
                    <CoreButton onClick={()=>player.eatFood()}>Eat</CoreButton>
            </ColumnCenterAlignedView>
        </ContentFitAltView>
    );
};

export default FoodView;