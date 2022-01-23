import { MoralisContext, useMoralisQuery } from 'react-moralis';
import { Moralis } from 'moralis';
import subCategories from '../scripts/subCategories';
import useQueryLoader from '../hooks/useQueryLoader';

function basicQuery(query, catQuery, props) {
  catQuery.equalTo('type', props.type);
  return query.matchesQuery('category', catQuery);
}

function filterQuery(query, catFilters) {
  return query.containedIn('subCategory', Array.from(catFilters));
}

function searchQuery(query, searchText) {
  // search everything in the object
  return query.fullText('title', searchText);
}

function queryIncludeProfile(query) {
  // return query.include('profile').include(['profile.user']); //This doesn't work cause of permission issues
  return query.include('profile');
}

function querySort(query) {
  return query.ascending('price');
}

/*
 * Used to build a query for reading from the DB.
 * Can be easily modified to extend the filtering functionality.
 */
function buildQuery(query, props, searchText) {
  const Category = Moralis.Object.extend('Category');
  let catQuery = new Moralis.Query(Category);
  query = basicQuery(query, catQuery, props);
  if (searchText !== '') {
    query = searchQuery(query, searchText);
  }
  if (props.catFilters.size > 0) {
    query = filterQuery(query, props.catFilters);
  }
  query = queryIncludeProfile(query);
  query = querySort(query);
  return query;
}

export const getProductsFromDB = (props, searchText) => {
  //TODO use fullText() ? Has performance impact
  const { data, error, isFetching } = useMoralisQuery(
    'Product',
    (query) => buildQuery(query, props, searchText),
    [props, searchText]
  );

  let output = useQueryLoader(data, isFetching, error);
  return output;
};

export const getProductWithId = (id) => {
  const { data, isFetching, error } = useMoralisQuery(
    'Product',
    (query) => query.equalTo('objectId', id).include('profile').include('taskId'),
    [id]
  );

  let output = useQueryLoader(data, isFetching, error);
  return output;
};

export const getCategoriesFromDB = (type) => {
  const { data, error, isLoading } = useMoralisQuery(
    'Category',
    (query) => query.equalTo('type', type),
    [type]
  );
  if (error) {
    console.log('Moralis error getting categories: ' + error);
  }
  if (isLoading) {
    console.log('Moralis isLoading getting categories: ' + isLoading);
  }
  return data;
};

export const getProfileFromDB = (user) => {
  const { data, isFetching, error } = useMoralisQuery(
    'Profile',
    (query) => query.equalTo('user', user),
    [user]
  );
  let output = useQueryLoader(data, isFetching, error);
  return output;
};

export const getProductsForProfile = (user) => {
  const Profile = Moralis.Object.extend('Profile');
  let profileQuery = new Moralis.Query(Profile);
  const { data, error, isFetching } = useMoralisQuery(
    'Product',
    (query) => {
      profileQuery.equalTo('user', user);
      return query.matchesQuery('profile', profileQuery).equalTo('addedToMarketplace', false);
    },
    [profileQuery, user]
  );

  let output = useQueryLoader(data, isFetching, error);
  return output;
};

//Gets the token for current user.  This is important so we know whether to create a new token or use an existing one.
export const getTokenForProfile = (user) => {
  let userAddr = '';
  if (user) {
    userAddr = user.get('ethAddress');
  }
  const { data, error, isLoading } = useMoralisQuery(
    'PazariToken',
    (query) => query.equalTo('sender', userAddr),
    [userAddr]
  );
  if (error) {
    console.log('Moralis error getting categories: ' + error);
  }
  if (isLoading) {
    console.log('Moralis isLoading getting categories: ' + isLoading);
  }
  return data;
};

export const ownedItems = (itemId, addr) => {
  const { data, isFetching, error } = useMoralisQuery(
    'ItemSold',
    (query) => query.equalTo('itemID', itemId).equalTo('owner', addr),
    [itemId, addr]
  );

  let output = useQueryLoader(data, isFetching, error);
  return output;
};
