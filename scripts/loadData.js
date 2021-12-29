const Moralis = require('moralis/node');
const appId=process.env.NEXT_PUBLIC_MORALIS_APP_ID;
const serverUrl=process.env.NEXT_PUBLIC_MORALIS_SERVER_ID;
Moralis.start({serverUrl, appId});

/**
 * To run: node scripts/loadData.js
 * 
 * This script will load data into the 'MarketplaceItems' table in Moralis.
 * It can be safely ran multiple times, it will add new items with updated IDs.
 */
const load = async function () {

    const MarketplaceItems = Moralis.Object.extend("MarketplaceItems");

    //Get latest item
    const query = new Moralis.Query(MarketplaceItems);
    query.descending("itemID");
    const res = await query.first();
    let latestItemID = 0;
    if (res) {
        console.log("got item: " + res.id);
        latestItemID = res.get("itemID");
    }
    console.log("latest itemId: " + latestItemID);
    let newItemId = (parseInt(latestItemID) + 1);

    //Change the second parameter to change the number of items to be saved.
    newItemId = saveItems("book", 5, newItemId, MarketplaceItems);
    newItemId = saveItems("game", 3, newItemId, MarketplaceItems);
    newItemId = saveItems("graphic", 2, newItemId, MarketplaceItems);
    newItemId = saveItems("photo", 3, newItemId, MarketplaceItems);
    newItemId = saveItems("video", 1, newItemId, MarketplaceItems);


    console.log("Finished saving items!");
}

function saveItems (type, count, itemId, MarketplaceItems) {
    console.log("SaveItems itemId: " + itemId + ", count: " + count + ", type: " + type);
    for (let i = itemId; i < itemId + count; i++) {
        let price = Math.floor(Math.random() * 20);
        let marketplaceItem = new MarketplaceItems();
        marketplaceItem.set("itemID", i);
        marketplaceItem.set("tokenID", i.toString());
        marketplaceItem.set("price", price.toString());
        marketplaceItem.set("type", type);
        marketplaceItem.save()
            .then((marketplaceItem) => {
                console.log('New object created with itemID: ' + marketplaceItem.get("itemID"));
            }, (error) => {
                console.log('Failed creating object, error code: ' + error.message);
            });
    }
    return itemId + count; //return the new item id
}

load();