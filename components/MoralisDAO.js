import { MoralisContext, useMoralisQuery } from 'react-moralis';
//import { Moralis } from 'moralis';
import subCategories from '../scripts/subCategories';
import useQueryLoader from '../hooks/useQueryLoader';
import { useState, useLayoutEffect, useEffect } from 'react';

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

export const getProductForProfileNoMarketplace = (user) => {
  console.log('Getting products');
  const Profile = Moralis.Object.extend('Profile');
  let profileQuery = new Moralis.Query(Profile);
  const { data, error, isLoading } = useMoralisQuery(
    'Product',
    (query) => {
      profileQuery.equalTo('userId', user.id);
      return query.matchesQuery('profile', profileQuery).equalTo('addedToMarketplace', false);
    },
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
