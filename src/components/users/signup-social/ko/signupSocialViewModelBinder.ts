import { Bag } from "@paperbits/common";
import { ComponentFlow } from "@paperbits/common/editing";
import { ViewModelBinder, WidgetState } from "@paperbits/common/widgets";
import { TermsOfService } from "../../../../contracts/identitySettings";
import { IdentityService } from "../../../../services/identityService";
import { SignupSocialModel } from "../signupSocialModel";
import { SignupSocialViewModel } from "./signupSocialViewModel";
import { ISettingsProvider } from "@paperbits/common/configuration";
import { EventManager, Events } from "@paperbits/common/events";
import { StyleCompiler } from "@paperbits/common/styles";
import { SignupSocialHandlers } from "../signupSocialHandlers";

export class SignupSocialViewModelBinder implements ViewModelBinder<SignupSocialModel, SignupSocialViewModel> {
    constructor(private readonly eventManager: EventManager,
        private readonly identityService: IdentityService,
        private readonly settingsProvider: ISettingsProvider,
        private readonly styleCompiler: StyleCompiler) { }

    public async getTermsOfService(): Promise<TermsOfService> {
        const identitySetting = await this.identityService.getIdentitySetting();
        return identitySetting.properties.termsOfService;
    }

    public async modelToViewModel(model: SignupSocialModel, viewModel?: SignupSocialViewModel, bindingContext?: Bag<any>): Promise<SignupSocialViewModel> {
        if (!viewModel) {
            viewModel = new SignupSocialViewModel();
        }

        viewModel["widgetBinding"] = {
            displayName: "Sign-up form: OAuth",
            layer: bindingContext?.layer,
            model: model,
            flow: ComponentFlow.Block,
            draggable: true,
            handler: SignupSocialHandlers,
            applyChanges: async (updatedModel: SignupSocialModel) => {
                this.modelToViewModel(updatedModel, viewModel, bindingContext);
                this.eventManager.dispatchEvent(Events.ContentUpdate);
            }
        };

        const identityProviders = await this.identityService.getIdentityProviders();

        const identityProvider = identityProviders.find(x => x.type === "aad" || x.type === "aadB2C");

        if (identityProvider) {
            viewModel.identityProvider(true);
        }

        const settings = await this.settingsProvider.getSettings();
        viewModel.mode(settings["environment"]);

        const params = {};
        const termsOfService = await this.getTermsOfService();
        if (termsOfService.text) params["termsOfUse"] = termsOfService.text;
        if (termsOfService.consentRequired) params["isConsentRequired"] = termsOfService.consentRequired;
        if (termsOfService.enabled) params["termsEnabled"] = termsOfService.enabled;

        if (Object.keys(params).length !== 0) {
            const runtimeConfig = JSON.stringify(params);
            viewModel.runtimeConfig(runtimeConfig);
        }

        if (model.styles) {
            viewModel.styles(await this.styleCompiler.getStyleModelAsync(model.styles, bindingContext?.styleManager));
        }

        return viewModel;
    }


    public stateToInstance(state: WidgetState, componentInstance: SignupSocialViewModel): void {
        componentInstance.styles(state.styles);
        componentInstance.identityProvider(state.identityProvider);

        componentInstance.runtimeConfig(JSON.stringify({
            termsOfUse: state.termsOfUse,
            isConsentRequired: state.isConsentRequired,
            termsEnabled: state.termsEnabled
        }));
    }

    public async modelToState(model: SignupSocialModel, state: WidgetState): Promise<void> {
        const identityProviders = await this.identityService.getIdentityProviders();
        const identityProvider = identityProviders.find(x => x.type === "aad" || x.type === "aadB2C");

        if (identityProvider) {
            state.identityProvider = true;
        }

        const settings = await this.settingsProvider.getSettings();
        state.mode = settings["environment"];

        const termsOfService = await this.getTermsOfService();
        state.termsOfUse = termsOfService.text;
        state.isConsentRequired = termsOfService.consentRequired;
        state.termsEnabled = termsOfService.enabled;

        if (model.styles) {
            state.styles = await this.styleCompiler.getStyleModelAsync(model.styles);
        }
    }
}