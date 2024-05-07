import {CoreButton, CoreImage, CoreText} from "../styles/styles";
import { Component } from 'solid-js'
import {useFirebaseApp} from "solid-firebase";
import {getAuth, signOut} from "firebase/auth";
import useContextSaver, {ContextSaverData} from "../contexts/ContextSaver";
import {styled} from "solid-styled-components";
import {secondaryColor} from "../styles/colors";

const StyledHeaderView = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 15vh;
    background-color: ${secondaryColor}; // Set default if not exported
    z-index: 200;
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    align-items: center;
    padding: 20px;
`;

interface IHeaderViewProps
{

}

const HeaderView: Component<IHeaderViewProps> = (props) => {
    const app = useFirebaseApp();
    const contextSaver = useContextSaver() as ContextSaverData;

    async function signOutUser()
    {
        await signOut(getAuth(app));
    }

    return (
        <StyledHeaderView>
            <CoreImage src={`/assets/icon.png`} alt="NO IMG" style={{"margin-right": '50px'}} width={120} height={120}></CoreImage>
            <CoreText style={{"font-size": '46px'}}>Idle RPG</CoreText>
            <CoreButton style={{"margin-left": "auto", 'width': '180px', 'height': '50px'}} onClick={contextSaver.saveUserData}>Save</CoreButton>
            <CoreButton style={{"margin-left": "auto", 'width': '180px', 'height': '50px'}} onClick={signOutUser}>Sign Out</CoreButton>
        </StyledHeaderView>
    );
};

export default HeaderView;