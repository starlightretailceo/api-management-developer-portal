import * as DefaultStyleDefinitions from "../defaultStyleDefinitions";
import { IWidgetHandler } from "@paperbits/common/editing";
import { StyleDefinition } from "@paperbits/common/styles";
import { ReportsModel } from "./reportsModel";


export class ReportsHandlers implements IWidgetHandler {
    public async getWidgetModel(): Promise<ReportsModel> {
        return new ReportsModel()
    }

    public getStyleDefinitions(): StyleDefinition {
        return {
            colors: {
                gridBorderColor: {
                    displayName: "Grid separators color",
                    defaults: {
                        value: "#dee2e6"
                    }
                }
            },
            components: {
                reports: {
                    displayName: "Reports",
                    plugins: ["background", "margin", "padding"],
                    components: {
                        button: DefaultStyleDefinitions.getDefaultButtonStyleDefinition(),
                        titleText: DefaultStyleDefinitions.getWidgetTextStyleDefinition(),
                        tablePresetHead: DefaultStyleDefinitions.getTableHeadCellStyleDefinition(),
                        tablePresetRow: DefaultStyleDefinitions.getTableRowCellStyleDefinition(),
                        widgetText: DefaultStyleDefinitions.getWidgetTextStyleDefinition(),
                    }
                }
            }
        };
    }
}