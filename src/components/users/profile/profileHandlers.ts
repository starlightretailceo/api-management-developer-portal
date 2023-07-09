import { IWidgetHandler } from "@paperbits/common/editing";
import { StyleDefinition } from "@paperbits/common/styles";
import * as DefaultStyleDefinitions from "../../defaultStyleDefinitions";
import { ProfileModel } from "./profileModel";

export class ProfileHandlers implements IWidgetHandler {
    public async getWidgetModel(): Promise<ProfileModel> {
        return new ProfileModel()
    }

    public getStyleDefinitions(): StyleDefinition {
        return {
            components: {
                profile: {
                    displayName: "User Profile",
                    plugins: ["background", "typography", "margin", "padding"],
                    defaults: {
                        typography: {
                            colorKey: "colors/default",
                        }
                    },
                    components: {
                        changeNameButton: DefaultStyleDefinitions.getDefaultButtonStyleDefinition(),
                        changePasswordButton: DefaultStyleDefinitions.getDefaultButtonStyleDefinition(),
                        closeAccountButton: DefaultStyleDefinitions.getDefaultButtonStyleDefinition(),
                        saveButton: DefaultStyleDefinitions.getDefaultButtonStyleDefinition(),
                        cancelButton: DefaultStyleDefinitions.getDefaultButtonStyleDefinition(),
                        input: DefaultStyleDefinitions.getInputStyleDefinition()
                    }
                }
            }
        };
    }
}