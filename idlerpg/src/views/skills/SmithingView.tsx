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
                        title: 'bars',
                        taskIds: [
                            'smithing_bronze_bar',
                            'smithing_iron_bar',
                            'smithing_steel_bar',
                            'smithing_mithril_bar',
                            'smithing_adamantite_bar',
                            'smithing_runite_bar',
                        ]
                    },
                    {
                        title: 'bronze',
                        taskIds: [
                            'smithing_bronze_dagger', 'smithing_bronze_scimitar',
                        ]
                    },
                    {
                        title: 'iron',
                        taskIds: [
                            'smithing_iron_dagger', 'smithing_iron_scimitar',
                        ]
                    },
                    {
                        title: 'steel',
                        taskIds: [
                            'smithing_steel_dagger', 'smithing_steel_scimitar',
                        ]
                    },
                    {
                        title: 'mithril',
                        taskIds: [
                            'smithing_mithril_dagger', 'smithing_mithril_scimitar',
                        ]
                    },
                    {
                        title: 'adamantite',
                        taskIds: [
                            'smithing_adamant_dagger', 'smithing_adamant_scimitar',
                        ]
                    },
                    {
                        title: 'runite',
                        taskIds: [
                            'smithing_rune_dagger', 'smithing_rune_scimitar',
                        ]
                    },
                ] }/>
        </div>
    );
};

export default SmithingView;