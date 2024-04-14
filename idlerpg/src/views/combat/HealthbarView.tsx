import {Component} from "solid-js";
import {styled} from "solid-styled-components";
import {redColor, highlightColor, primaryColor} from "../../styles/colors";

const HealthBarContainer = styled.div`
    width: 100%;
    height: 35px;
    background-color: ${highlightColor};
    border-radius: 10px;
    margin-bottom: 5px;
`;

const HealthBar = styled.div<{}>`
    height: 100%;
    background-color: ${redColor};
    border-radius: 10px;
`;

interface IHealthbarViewProps
{
}

const HealthbarView: Component<IHealthbarViewProps> = (props) => {

    return (
        <div>
            <HealthBarContainer>
                <HealthBar style={`width: ${}%`}></HealthBar>
            </HealthBarContainer>
        </div>
    );
};

export default HealthbarView;