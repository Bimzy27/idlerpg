import {Component, createSignal, JSX, Show} from "solid-js";
import {CoreImage, CoreText, RowCenterAlignedView, TransparentButton} from "../../styles/styles";
import {backgroundAlt1Color, backgroundAlt2Color} from "../../styles/colors";

interface ICollapseViewProps
{
    text:string
    defaultExpanded:boolean
    children?: JSX.Element;
}

const CollapseView : Component<ICollapseViewProps> = (props) => {
    const [expanded, setExpanded] = createSignal(props.defaultExpanded);

    return (
        <div style={{width: '100%', height: "fit-content"}}>
            <div style={{"background-color": `${backgroundAlt1Color}`, width: '100%', height: '60px'}}>
                <TransparentButton onClick={()=>setExpanded(!expanded())}>
                    <RowCenterAlignedView>
                        <CoreImage src={expanded() ? `/assets/ui/vision.png` : `/assets/ui/vision_disabled.png`} width={55} height={55}></CoreImage>
                        <CoreText>{props.text}</CoreText>
                    </RowCenterAlignedView>
                </TransparentButton>
            </div>
            <Show when={expanded()}>
                <div style={{"background-color": `${backgroundAlt2Color}`, width: '100%', height: "fit-content", "margin-top": '10px'}}>
                    {props.children}
                </div>
            </Show>
        </div>
    )
}

export default CollapseView;