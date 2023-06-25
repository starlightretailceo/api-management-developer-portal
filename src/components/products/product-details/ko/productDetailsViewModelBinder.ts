import { StyleCompiler } from "@paperbits/common/styles";
import { ViewModelBinder, WidgetState } from "@paperbits/common/widgets";
import { ProductDetailsModel } from "../productDetailsModel";
import { ProductDetailsViewModel } from "./productDetailsViewModel";


export class ProductDetailsViewModelBinder implements ViewModelBinder<ProductDetailsModel, ProductDetailsViewModel> {
    constructor(private readonly styleCompiler: StyleCompiler) { }

    // public async modelToViewModel(model: ProductDetailsModel, viewModel?: ProductDetailsViewModel, bindingContext?: Bag<any>): Promise<ProductDetailsViewModel> {
    //     if (!viewModel) {
    //         viewModel = new ProductDetailsViewModel();
    //     }

    //     viewModel["widgetBinding"] = {
    //         displayName: "Product: Details",
    //         layer: bindingContext?.layer,
    //         model: model,
    //         draggable: true,
    //         handler: ProductDetailsHandlers,
    //         flow: ComponentFlow.Block,
    //         applyChanges: async (updatedModel: ProductDetailsModel) => {
    //             await this.modelToViewModel(updatedModel, viewModel, bindingContext);
    //             this.eventManager.dispatchEvent(Events.ContentUpdate);
    //         }
    //     };

    //     if (model.styles) {
    //         viewModel.styles(await this.styleCompiler.getStyleModelAsync(model.styles, bindingContext?.styleManager));
    //     }

    //     return viewModel;
    // }

    // public canHandleModel(model: ProductDetailsModel): boolean {
    //     return model instanceof ProductDetailsModel;
    // }



    public stateToInstance(state: WidgetState, componentInstance: ProductDetailsViewModel): void {
        componentInstance.styles(state.styles);
    }

    public async modelToState(model: ProductDetailsModel, state: WidgetState): Promise<void> {
        if (model.styles) {
            state.styles = await this.styleCompiler.getStyleModelAsync(model.styles);
        }
    }
}