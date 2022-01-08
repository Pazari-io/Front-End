import { MoralisContext, useMoralisQuery } from 'react-moralis';
import { Moralis } from 'moralis';

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
  query = querySort(query);
  return query;
}

export const getProductsFromDB = (props, searchText) => {
  //TODO use fullText() ? Has performance impact

  const { data, error, isLoading } = useMoralisQuery(
    'Product',
    (query) => buildQuery(query, props, searchText),
    [props, searchText]
  );
  if (error) {
    console.log('Moralis error: ' + error);
  }
  if (isLoading) {
    console.log('Moralis isLoading: ' + isLoading);
  }
  return data;
};

export const getCategoriesFromDB = (props) => {
  const { data, error, isLoading } = useMoralisQuery(
    'Category',
    (query) => query.equalTo('type', props.type),
    [props.type]
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
  console.log(user);
  let id = '';
  if (user !== null) {
    id = user.id;
  }

  const { data, error, isLoading } = useMoralisQuery(
    'Profile',
    (query) => query.equalTo('userId',id),
    [id]
  );
  if (error) {
    console.log('Moralis error getting categories: ' + error);
  }
  if (isLoading) {
    console.log('Moralis isLoading getting categories: ' + isLoading);
  }
  return data;
};



export const getProductForProfile = (user) => {
  const { data, error, isLoading } = useMoralisQuery(
    'Product',
    (query) => query.equalTo('user', user),
    [user]
  );
  if (error) {
    console.log('Moralis error getting categories: ' + error);
  }
  if (isLoading) {
    console.log('Moralis isLoading getting categories: ' + isLoading);
  }
  return data;
};

export const getProductForProfileNoMarketplace = (user) => {
  console.log("Getting products");
  const Profile = Moralis.Object.extend('Profile');
  let profileQuery = new Moralis.Query(Profile);
  console.log(user);
  const { data, error, isLoading } = useMoralisQuery(
    'Product',
    (query) => { profileQuery.equalTo('userId', user.id);
      return query.matchesQuery('profile', profileQuery)
                    .equalTo('addedToMarketplace', false);
        }      ,
    [profileQuery, user.id]
  );
  if (error) {
    console.log('Moralis error getting categories: ' + error);
  }
  if (isLoading) {
    console.log('Moralis isLoading getting categories: ' + isLoading);
  }
  return data;
};