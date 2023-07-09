import { IWidgetHandler } from "@paperbits/common/editing";
import { StyleDefinition } from "@paperbits/common/styles";
import * as DefaultStyleDefinitions from "../../defaultStyleDefinitions";
import { SigninModel } from "./signinModel";

export class SigninHandlers implements IWidgetHandler {
    public async getWidgetModel(): Promise<SigninModel> {
        return new SigninModel()
    }

    public getStyleDefinitions(): StyleDefinition {
        return {
            components: {
                signin: {
                    displayName: "Signin",
                    plugins: ["margin", "padding", "background"],
                    components: {
                        signinButton: DefaultStyleDefinitions.getButtonStyleDefinition(),
                        widgetText: DefaultStyleDefinitions.getWidgetTextStyleDefinition(),
                        input: DefaultStyleDefinitions.getInputStyleDefinition()
                    }
                }
            }
        };
    }
}