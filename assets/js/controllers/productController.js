import { getProducts } from "../services/api.js";

class ProductController {

    static handleGetProducts = async ({
        productType
    }) => {
        try {
            const response = await getProducts(productType);
            buildProductList(response.data);
            return true;
        } catch (err) {
            return false;
        } finally {
            buildShoppingCart();
        }
    };

}
export default ProductController;