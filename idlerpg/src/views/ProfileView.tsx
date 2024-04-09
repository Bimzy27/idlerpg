import {Component} from "solid-js";
import {CoreText, StyledTabView} from "../styles/styles";

interface IProfileViewProps
{

}

const ProfileView: Component<IProfileViewProps> = (props) => {
    return (
        <div>
            <CoreText>Profile</CoreText>
        </div>
    );
};

export default ProfileView;