import {CoreImage, CoreText, RowCenterAlignedView} from "../styles/styles";
import {Component} from "solid-js";

interface ICoinsViewProps
{
    amount:number;
}

const CoinsView: Component<ICoinsViewProps> = (props) => {
    return (
        <RowCenterAlignedView>
            <CoreImage src={`/assets/coins.png`} width={30} height={30}/>
            <CoreText>{props.amount}</CoreText>
        </RowCenterAlignedView>
    );
};

export default CoinsView;