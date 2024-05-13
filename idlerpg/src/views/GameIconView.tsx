import {CoreImage, CoreText, RowCenterAlignedView} from "../styles/styles";
import {isSkillId} from "../data/SkillBuilder";
import stringUtil from "../common/StringUtil";

export interface IGameIconViewProps
{
    viewName:string;
    fontSize?:number;
}

const GameIconView = (props:IGameIconViewProps) => {
    function getImagePath():string
    {
        return isSkillId(props.viewName) ? `skills/${props.viewName}` : props.viewName;
    }
    return (
        <RowCenterAlignedView>
            <CoreImage src={`/assets/${getImagePath()}.png`} alt="NO IMG" width={35} height={35}></CoreImage>
            <CoreText style={{"padding-left": '6px', "font-size": `${props.fontSize ? props.fontSize : 20}px`}}>{stringUtil.capitalizeFirstLetter(props.viewName)}</CoreText>
        </RowCenterAlignedView>
    );
};

export default GameIconView;