import { useDispatch } from "react-redux";
import { RESTAURANT_IMG } from "../utils/constants";
import { addItem } from "../utils/cartSlice";

export const ItemList = ({ items }) => {
    const { id, name, price, defaultPrice, description, imageId } = items?.card?.info || {};

    const dispatch = useDispatch();

    const handleAddItem = (items) => {
        // onClick of Add button dispatch an action
        dispatch(addItem(items));
    }

    return (
        <div> 
            <div key={id} className="border-b-2 p-2 m-2 border-gray-200 text-left flex justify-between">
                <div className="pr-7 w-9/12">
                    <div className="font-bold">{name}</div>
                    <div className="text-base font-semibold">&#8377;{price ? price/100 : defaultPrice/100}</div>
                    <p className="text-sm pt-2">{description}</p> 
                </div>
                <div className="w-3/12">
                    <div className="relative" style={{ paddingBottom: '100%' }}>
                        <img 
                            className="absolute inset-0 object-cover w-full h-full rounded-lg" 
                            src={RESTAURANT_IMG + imageId} 
                            alt="item-imgs" 
                        />
                    </div>
                    <button className="p-2 px-14 rounded-lg bg-white shadow-lg" onClick={() => handleAddItem(items)}>Add</button>
                </div>
            </div>
        </div>
    );
}