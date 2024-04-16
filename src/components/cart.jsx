import { useDispatch, useSelector } from "react-redux";
import { ItemList } from "./itemList";
import { clearCart } from "../utils/cartSlice";

export const Cart = () => {
    const dispatch = useDispatch();
    const cartItems =  useSelector((store) => store.cart.items)

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    return (
        <div className="text-center m-4 p-4">
            <div className="text-2xl font-bold">Cart</div>
            <div className="w-6/12 mx-auto text-right">
                <button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleClearCart}>Clear Cart</button>
            </div>
            <div className="w-6/12 mx-auto text-center">
                {cartItems.length === 0 && <div className="font-bold italic">"Cart is empty, Add Items in to the card!"</div>}
                {cartItems.map((item, index) => (
                    <ItemList key={index} items={item} />
                ))}
            </div>
        </div>
    );
}