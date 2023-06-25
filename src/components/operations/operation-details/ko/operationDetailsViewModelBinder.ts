import { ViewModelBinder, WidgetState } from "@paperbits/common/widgets";
import { EventManager, Events } from "@paperbits/common/events";
import { OperationDetailsViewModel } from "./operationDetailsViewModel";
import { OperationDetailsModel } from "../operationDetailsModel";
import { Bag } from "@paperbits/common";
import { ComponentFlow } from "@paperbits/common/editing";
import { OperationDetailsHandlers } from "../operationDetailsHandlers";
import { StyleCompiler } from "@paperbits/common/styles";

export class OperationDetailsViewModelBinder implements ViewModelBinder<OperationDetailsModel, OperationDetailsViewModel> {
    constructor(
        private readonly styleCompiler: StyleCompiler
    ) { }


    public stateToInstance(state: WidgetState, componentInstance: OperationDetailsViewModel): void {
        componentInstance.styles(state.styles);

        componentInstance.config(JSON.stringify({
            enableConsole: state.enableConsole,
            enableScrollTo: state.enableScrollTo,
            defaultSchemaView: state.defaultSchemaView,
            useCorsProxy: state.useCorsProxy,
            includeAllHostnames: state.includeAllHostnames,
            showExamples: state.showExamples
        }));
    }

    public async modelToState(model: OperationDetailsModel, state: WidgetState): Promise<void> {
        state.enableConsole = model.enableConsole;
        state.enableScrollTo = model.enableScrollTo;
        state.defaultSchemaView = model.defaultSchemaView;
        state.useCorsProxy = model.useCorsProxy;
        state.includeAllHostnames = model.includeAllHostnames;
        state.showExamples = model.showExamples;

        if (model.styles) {
            state.styles = await this.styleCompiler.getStyleModelAsync(model.styles);
        }
    }

    // public async modelToViewModel(model: OperationDetailsModel, viewModel?: OperationDetailsViewModel, bindingContext?: Bag<any>): Promise<OperationDetailsViewModel> {
    //     if (!viewModel) {
    //         viewModel = new OperationDetailsViewModel();

    //         viewModel["widgetBinding"] = {
    //             displayName: "Operation: Details",
    //             layer: bindingContext?.layer,
    //             model: model,
    //             draggable: true,
    //             handler: OperationDetailsHandlers,
    //             flow: ComponentFlow.Block,
    //             editor: "operation-details-editor",
    //             applyChanges: async (updatedModel: OperationDetailsModel) => {
    //                 await this.modelToViewModel(updatedModel, viewModel, bindingContext);
    //                 this.eventManager.dispatchEvent(Events.ContentUpdate);
    //             }
    //         };
    //     }



    //     if (model.styles) {
    //         viewModel.styles(await this.styleCompiler.getStyleModelAsync(model.styles, bindingContext?.styleManager));
    //     }

    //     const runtimeConfig = {
    //         enableConsole: model.enableConsole,
    //         enableScrollTo: model.enableScrollTo,
    //         defaultSchemaView: model.defaultSchemaView,
    //         useCorsProxy: model.useCorsProxy,
    //         includeAllHostnames: model.includeAllHostnames,
    //         showExamples: model.showExamples,
    //     };

    //     viewModel.config(JSON.stringify(runtimeConfig));

    //     return viewModel;
    // }

    // public canHandleModel(model: OperationDetailsModel): boolean {
    //     return model instanceof OperationDetailsModel;
    // }
}