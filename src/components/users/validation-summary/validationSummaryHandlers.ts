import * as DefaultStyleDefinitions from "../../defaultStyleDefinitions";
import { IWidgetHandler } from "@paperbits/common/editing";
import { StyleDefinition } from "@paperbits/common/styles";
import { ValidationSummaryModel } from "../validation-summary/validationSummaryModel";


export class ValidationSummaryHandlers implements IWidgetHandler {
    public async getWidgetModel(): Promise<ValidationSummaryModel> {
        return new ValidationSummaryModel()
    }

    public getStyleDefinitions(): StyleDefinition {
        return {
            colors: {
                validationTextColor: {
                    displayName: "Validation Text Color",
                    defaults: {
                        value: "#721c24"
                    }
                },
                validationBackgroundColor: {
                    displayName: "Validation Background Color",
                    defaults: {
                        value: "#f8d7da"
                    }
                },
                validationBorderColor: {
                    displayName: "Validation Border Color",
                    defaults: {
                        value: "#f5c6cb"
                    }
                }
            },
            components: {
                validationSummary: {
                    displayName: "Validation Summary",
                    plugins: ["background", "typography", "margin", "padding"],
                    components: {
                        alertDanger: DefaultStyleDefinitions.getAlertStyleDefinition()
                    }
                }
            }
        };
    }
}