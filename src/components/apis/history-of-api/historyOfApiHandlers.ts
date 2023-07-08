import { IWidgetHandler } from "@paperbits/common/editing";
import { StyleDefinition } from "@paperbits/common/styles";
import { HistoryOfApiModel } from "./historyOfApiModel";
import * as DefaultStyleDefinitions from "../../defaultStyleDefinitions";

export class HistoryOfApiHandlers implements IWidgetHandler {
    public async getWidgetModel(): Promise<HistoryOfApiModel> {
        return new HistoryOfApiModel();
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
                apiHistory: {
                    displayName: "History Of API",
                    plugins: ["margin", "padding", "background", "typography"],
                    defaults: {
                        typography: {
                            colorKey: "colors/default"
                        }
                    },
                    components: {
                        tableRow: DefaultStyleDefinitions.getTableRowStyleDefinition(),
                        tableHead: DefaultStyleDefinitions.getTableHeadStyleDefinition(),
                        widgetText: DefaultStyleDefinitions.getWidgetTextStyleDefinition()
                    }

                }
            }
        };
    }
}