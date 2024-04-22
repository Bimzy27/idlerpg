import {Component} from "solid-js";
import SkillContentView from "./SkillContentView";

interface ISmithingViewProps
{
}

const SmithingView: Component<ISmithingViewProps> = (props) => {
    return (
        <div>
            <SkillContentView
                skillId={'smithing'}
                navigationTabs={ [
                    {
                        title: 'smelt',
                        taskIds: [
                            'smithing_bronze_bar', 'smithing_bronze_dagger', 'smithing_bronze_scimitar',
                            'smithing_iron_bar', 'smithing_iron_dagger', 'smithing_iron_scimitar',
                            'smithing_steel_bar', 'smithing_steel_dagger', 'smithing_steel_scimitar',
                            'smithing_mithril_bar', 'smithing_mithril_dagger', 'smithing_mithril_scimitar',
                            'smithing_adamantite_bar', 'smithing_adamant_dagger', 'smithing_adamant_scimitar',
                            'smithing_runite_bar', 'smithing_rune_dagger', 'smithing_rune_scimitar',
                        ]
                    }
                ] }/>
        </div>
    );
};

export default SmithingView;