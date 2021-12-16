import Nav from "../components/NavBar"

import { useMoralisQuery } from "react-moralis";

function generateItem(item) {

    return <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">


        <article class="overflow-hidden rounded-lg shadow-lg">

            <a href="#">
                <img alt="Placeholder" class="block h-auto w-full" src="https://picsum.photos/600/400/?random" />
            </a>

            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                <h1 class="text-lg">
                    <a class="no-underline hover:underline text-black dark:text-gray-300" href="#">
                            Item {item.get("itemID")}
                        </a>
                </h1>
                <p class="text-grey-darker dark:text-gray-300 text-sm">
                    11/1/19
                    </p>
            </header>

            <footer class="flex items-center justify-between leading-none p-2 md:p-4">
                <a class="flex items-center no-underline hover:underline text-b dark:text-gray-300" href="#">
                    <img alt="Placeholder" class="block rounded-full" src="https://picsum.photos/32/32/?random" />
                    <p class="ml-2 text-sm">
                            Cost: {item.get("price")}
                        </p>
                </a>
                <a class="no-underline text-grey-darker dark:text-gray-300 hover:text-red-dark" href="#">
                    <span class="hidden">Like</span>
                    <i class="fa fa-heart"></i>
                </a>
            </footer>

        </article>


    </div>
}

function displayMarketItems() {
    let items = getMarketItems();
    let res = [];
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        res.push(generateItem(item))
        
    }
    return <div class="flex flex-wrap -mx-1 lg:-mx-4">{res}</div>;
}

function getMarketItems() {
    const{data, error, isLoading} = useMoralisQuery("MarketplaceItems");
    if (error) {
        return <span>Error getting items from Moralis</span>;
    }
    if (isLoading) {
        return <span>Loading items...</span>;
    }
    return data;

}

export default function Home() {


return (
    <div className="dark:bg-gray-900" >
    <Nav/>

    <div class="container  mx-auto px-4 md:px-12 dark:bg-gray-900">
        {displayMarketItems()}
    <div class="flex flex-wrap -mx-1 lg:-mx-4">

    </div>
</div>



    </div>

    
    )
}