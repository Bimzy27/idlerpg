import {Component} from "solid-js";
import {CoreImage, CoreText, StyledHeaderView} from "../styles/styles";

interface IHeaderViewProps
{

}

const HeaderView: Component<IHeaderViewProps> = (props) => {
    return (
        <StyledHeaderView>
            <CoreImage src={`/assets/icon.png`} alt="NO IMG" style={{"margin-right": '50px'}} width={120} height={120}></CoreImage>
            <CoreText style={{"font-size": '46px'}}>Idle RPG</CoreText>
        </StyledHeaderView>
    );
};

export default HeaderView;