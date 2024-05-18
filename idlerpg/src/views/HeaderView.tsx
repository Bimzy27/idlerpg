import {CoreButton, CoreImage, CoreText} from "../styles/styles";
import { Component } from 'solid-js'
import {useFirebaseApp} from "solid-firebase";
import {getAuth, signOut} from "firebase/auth";
import useContextSaver, {ContextSaverData} from "../contexts/ContextSaver";
import {styled} from "solid-styled-components";
import useGameView, {GameViewData} from "../contexts/GameViewContext";
import skillBuilder, {isSkillId} from "../data/SkillBuilder";
import GameIconView from "./GameIconView";

const StyledHeaderView = styled.div`
    left: 0;
    top: 0;
    width: 100%;
    height: 80px;
    background-color: ${props => props.color};
    z-index: 200;
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
`;

interface IHeaderViewProps
{
}

const HeaderView: Component<IHeaderViewProps> = (props) => {
    const app = useFirebaseApp();
    const contextSaver = useContextSaver() as ContextSaverData;
    const gameView = useGameView() as GameViewData;

    async function signOutUser()
    {
        await signOut(getAuth(app));
    }

    function getColor():string
    {
        const view = gameView.activeView();
        if (isSkillId(view))
        {
            return skillBuilder[view].color
        }

        switch (view)
        {
            default:
            case 'profile':
                return "#1a9cb2";
            case 'bank':
                return "#b47d3b";
            case 'quests':
                return "#0f5f8c";
            case 'location':
                return "#1f500c";
            case 'map':
                return "#4f9f2e";
            case 'combat':
                return "#b91717";
        }
    }

    return (
        <StyledHeaderView color={ getColor() }>
            <GameIconView viewName={gameView.activeView()} fontSize={40}/>
            <CoreButton style={{"margin-left": "auto", 'width': '180px', 'height': '50px'}} onClick={contextSaver.saveUserData}>Save</CoreButton>
            <CoreButton style={{"margin-left": "auto", 'width': '180px', 'height': '50px'}} onClick={signOutUser}>Sign Out</CoreButton>
        </StyledHeaderView>
    );
};



export default HeaderView;