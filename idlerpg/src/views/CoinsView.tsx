import {CoreImage, CoreText, RowCenterAlignedView} from "../styles/styles";
import {Component} from "solid-js";

interface ICoinsViewProps
{
    amount:number;
}

const CoinsView: Component<ICoinsViewProps> = (props) => {
    return (
        <RowCenterAlignedView style={{"margin-left": '10px'}}>
            <CoreImage src={`/assets/coins.png`} width={18} height={18}/>
            <CoreText style={{"font-size": '20px'}}>{props.amount}</CoreText>
        </RowCenterAlignedView>
    );
};

export default CoinsView;