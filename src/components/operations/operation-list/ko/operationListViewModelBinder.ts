import { ViewModelBinder, WidgetState } from "@paperbits/common/widgets";
import { OperationListViewModel } from "./operationListViewModel";
import { OperationListModel } from "../operationListModel";
import { StyleCompiler } from "@paperbits/common/styles";

export class OperationListViewModelBinder implements ViewModelBinder<OperationListModel, OperationListViewModel> {
    constructor(private readonly styleCompiler: StyleCompiler) { }

    // public async modelToViewModel(model: OperationListModel, viewModel?: OperationListViewModel, bindingContext?: Bag<any>): Promise<OperationListViewModel> {
    //     if (!viewModel) {
    //         viewModel = new OperationListViewModel();
    //     }

    //     viewModel.runtimeConfig(JSON.stringify({
    //         allowSelection: model.allowSelection,
    //         wrapText: model.wrapText,
    //         showToggleUrlPath: model.showToggleUrlPath,
    //         defaultShowUrlPath: model.defaultShowUrlPath,
    //         defaultGroupByTagToEnabled: model.defaultGroupByTagToEnabled,
    //         detailsPageUrl: model.detailsPageHyperlink
    //             ? model.detailsPageHyperlink.href
    //             : undefined
    //     }));

    //     viewModel["widgetBinding"] = {
    //         displayName: "List of operations",
    //         layer: bindingContext?.layer,
    //         model: model,
    //         draggable: true,
    //         handler: OperationListHandlers,
    //         flow: ComponentFlow.Block,
    //         editor: "operation-list-editor",
    //         applyChanges: async (updatedModel: OperationListModel) => {
    //             await this.modelToViewModel(updatedModel, viewModel, bindingContext);
    //             this.eventManager.dispatchEvent(Events.ContentUpdate);
    //         }
    //     };

    //     if (model.styles) {
    //         viewModel.styles(await this.styleCompiler.getStyleModelAsync(model.styles, bindingContext?.styleManager));
    //     }

    //     return viewModel;
    // }



    public stateToInstance(state: WidgetState, componentInstance: OperationListViewModel): void {
        componentInstance.styles(state.styles);

        componentInstance.runtimeConfig(JSON.stringify({
            allowSelection: state.allowSelection,
            wrapText: state.wrapText,
            showToggleUrlPath: state.showToggleUrlPath,
            defaultShowUrlPath: state.defaultShowUrlPath,
            defaultGroupByTagToEnabled: state.defaultGroupByTagToEnabled,
            detailsPageUrl: state.detailsPageUrl
        }));
    }

    public async modelToState(model: OperationListModel, state: WidgetState): Promise<void> {
        state.allowSelection = model.allowSelection;
        state.wrapText = model.wrapText;
        state.showToggleUrlPath = model.showToggleUrlPath;
        state.defaultShowUrlPath = model.defaultShowUrlPath;
        state.defaultGroupByTagToEnabled = model.defaultGroupByTagToEnabled;
        state.detailsPageUrl = model.detailsPageHyperlink
            ? model.detailsPageHyperlink.href
            : undefined

        if (model.styles) {
            state.styles = await this.styleCompiler.getStyleModelAsync(model.styles);
        }
    }
}