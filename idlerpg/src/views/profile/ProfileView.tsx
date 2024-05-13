import {Component} from "solid-js";
import {ColumnCenterAlignedView, CoreText} from "../../styles/styles";
import SkillsView from "../skills/SkillsView";

interface IProfileViewProps
{
}

const ProfileView: Component<IProfileViewProps> = (props) => {
    return (
        <ColumnCenterAlignedView>
            <CoreText>Profile</CoreText>
            <SkillsView/>
        </ColumnCenterAlignedView>
    );
};

export default ProfileView;