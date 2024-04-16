import { RESTAURANT_IMG } from "../utils/constants"

export const RestaurantCards = (props) => {
    const { resData } = props;

    const { cloudinaryImageId, name, cuisines, avgRating, sla, aggregatedDiscountInfoV3, locality } = resData?.info;
    console.log(resData)
    return (
        <div className="m-3 p-3 w-[200px] bg-slate-200 rounded-lg shadow-md hover:bg-slate-300">
            <figure className="relative max-w-sm">
                <img className="rounded-lg object-cover w-48 h-36" src={RESTAURANT_IMG + cloudinaryImageId} alt="restaurant-img" />
                <figcaption className="absolute px-2 py-1 text-m w-full rounded-b-lg text-white bottom-0 font-extrabold h-16 bg-gradient-to-b from-transparent to-gray-900 flex flex-col justify-end">
                    <p>{aggregatedDiscountInfoV3 ? aggregatedDiscountInfoV3?.header + " " + aggregatedDiscountInfoV3?.subHeader : ""}</p>
                </figcaption>
            </figure>
            <div className="font-bold pt-4 text-lg truncate">{name}</div>
            <div className="flex items-center">
                <div>{"⭐"} {avgRating}</div>
                <div className="px-2 text-xs text-gray-400">&#9679;</div>
                <div>{sla?.slaString}</div>
            </div>
            <h4 className="truncate">{cuisines.join(", ")}</h4>
            <h4>{ locality }</h4>
        </div>
    );
}