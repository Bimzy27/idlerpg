import {Component} from "solid-js";
import {ColumnCenterAlignedView, ContentFitAltView, CoreButton, CoreText} from "../../styles/styles";
import ItemView from "../ItemView";
import usePlayer, {PlayerData} from "../../contexts/PlayerContext";
import itemBuilder from "../../data/items/ItemBuilder";
import {IFood} from "../../models/Item";
import useInventory, {InventoryData} from "../../contexts/InventoryContext";

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
            return (itemBuilder[player.food()] as IFood).healing * 10;
        }
        else
        {
            return -1;
        }
    }

    return (
        <ColumnCenterAlignedView>
            <CoreText>Food</CoreText>
            <ContentFitAltView>
                <ItemView amount={inventory.getItem(player.food()).amount} id={player.food()}/>
                <CoreText>Healing: {getHealing()}</CoreText>
                <CoreButton onClick={()=>player.eatFood()}>Eat</CoreButton>
            </ContentFitAltView>
        </ColumnCenterAlignedView>
    );
};

export default FoodView;