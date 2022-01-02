import { useMoralisQuery } from 'react-moralis';


function basicQuery(query, type) {
    return query.equalTo('type', type);
}

function filterQuery(query, catFilters) {
    return query.containedIn('category', Array.from(catFilters));
}

function searchQuery(query, searchText) {
    return query.startsWith('title', searchText);
}

function querySort(query) {
    return query.ascending('itemID');
}

/*
 * Used to build a query for reading from the DB.
 * Can be easily modified to extend the filtering functionality.
 */
function buildQuery(query, props, searchText) {
  query = basicQuery(query, props.type);
  if (searchText !== '') {
    console.log("Search query");
    query = searchQuery(query, searchText);
  } 
  if (props.catFilters.size >  0) {
    console.log("Filter query");
    query = filterQuery(query, props.catFilters);
  } 
  query = querySort(query);
  return query;

}


export const getMarketItemsFromDB = (props, searchText) => {
  //TODO use fullText() ? Has performance impact

  const {data, error, isLoading} = useMoralisQuery(
      'MarketplaceItems',
      (query) => buildQuery(query, props, searchText),
      [props, searchText]
    );
  if (error) {
    console.log("Moralis error: " + error);
  }
  if (isLoading) {
    console.log("Moralis isLoading: " + isLoading);
  }
  return data;
}

