import { IWidgetHandler } from "@paperbits/common/editing";
import { StyleDefinition } from "@paperbits/common/styles";
import * as DefaultStyleDefinitions from "../../defaultStyleDefinitions";
import { ChangePasswordModel } from "./changePasswordModel";

export class ChangePasswordHandlers implements IWidgetHandler {
    public async getWidgetModel(): Promise<ChangePasswordModel> {
        return new ChangePasswordModel()
    }

    public getStyleDefinitions(): StyleDefinition {
        return {
            components: {
                changePassword: {
                    displayName: "Change Password",
                    plugins: ["margin", "padding", "background", "typography"],
                    defaults: {
                        typography: {
                            colorKey: "colors/default"
                        }
                    },
                    components: {
                        input: DefaultStyleDefinitions.getInputStyleDefinition(),
                        changeButton: DefaultStyleDefinitions.getButtonStyleDefinition()
                    }
                }
            }
        };
    }
}