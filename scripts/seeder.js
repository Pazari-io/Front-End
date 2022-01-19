/**
 * To run: node scripts/seeder.js
 * populating seed data into database
 **/

// CPL needs to be set before production
// no create field, mostly read only tables

const filters = require('./filters.js');
const subCategories = require('./subCategories.js');
const Moralis = require('moralis/node');
const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_ID;
const masterKey = process.env.MORALIS_MASTER_KEY;
Moralis.start({ serverUrl, appId, masterKey });

// Add a user to the admin role
const createAdmin = async (user) => {
  const Role = Moralis.Object.extend('_Role');
  const query = new Moralis.Query(Role);
  query.equalTo('name', 'Administrator');
  let found;
  await query.find({ useMasterKey: true }).then((results) => {
    if (results.length > 0) {
      found = results[0];
    }
  });
  if (found) return found;

  console.log('Creating admin role');
  const roleACL = new Moralis.ACL();
  roleACL.setPublicReadAccess(true);
  const role = new Moralis.Role('Administrator', roleACL);
  role.getUsers().add(user);

  role.save();
};

// ProductCategory

// ACL only admins can write everyone can read

// Relations
// Product has one category

// Fields
//- type string (string) // 'book' || 'audio' || 'video' || 'graphic' || 'game' || 'photo'
//- subCategories (list) // all subCategories
//- filters (list) // all filters for that category

// create categories and filters only admin can write everyone can read it
const createCategory = async (type, subCategories, filters) => {
  // only admin can write to this object
  const acl = new Moralis.ACL();
  acl.setRoleWriteAccess('Administrator', true);
  acl.setPublicReadAccess(true);

  const Category = Moralis.Object.extend('Category');
  const category = new Category();

  let query = new Moralis.Query(Category);
  query.equalTo('type', type);
  let found;
  await query.find().then((results) => {
    if (results.length > 0) {
      found = results[0];
    }
  });

  // only allow unique types
  if (found) return found;

  category.set('type', type);
  category.addUnique('subCategories', subCategories);
  category.addUnique('filters', filters);

  category.setACL(acl);
  // handle error
  await category.save();
  return category;
};

// file uploaded by user no one can read it except owner
const createOriginalLinks = async (orignalLink, user) => {
  const OrignalLinks = Moralis.Object.extend('PrivateLinks');
  const orignalLinks = new OrignalLinks();

  const acl = new Moralis.ACL();
  // public can't read it
  acl.setPublicReadAccess(false);
  // user can read it
  acl.setReadAccess(user.id, true);

  orignalLinks.set('user', user);
  orignalLinks.set('orignalLink', orignalLink);
  orignalLinks.setACL(acl);
  await orignalLinks.save();
};

// creates download link for purchased goods possibily populated after purchase

const createPrivateLinks = async (encryptedUrl, ipfsUrl, user) => {
  const acl = new Moralis.ACL();
  // public can't read it
  acl.setPublicReadAccess(false);
  // user can read it
  acl.setReadAccess(user.id, true);

  const PrivateLinks = Moralis.Object.extend('PrivateLinks');
  const privateLinks = new PrivateLinks();

  privateLinks.set('encryptedUrl', encryptedUrl);
  privateLinks.set('ipfsUrl', ipfsUrl);
  privateLinks.set('user', user);

  privateLinks.setACL(acl);
  await privateLinks.save();
};

// Product

// ACL only owner can update and write feilds
// public can read , title , description , tags , slideImgeUrls , preview urls
// owner can read original url
// verfied buyer can read encrypted url

// Relations

//  - each product has at least one user (owner) 1->N (for collabrations)
//  - each product has zero to many reviews  0->N
//  - each product has at most one type  0->1
//  - each product has zero to many categories 0->N
//  - each product has zero to many tags 0->N

// -Fields
// - title (string) // title
// - category (Category) //category of the product (book, video, etc)
// - subCategory (list)
// - addedToMarketplace (bool) //The product can be created without adding it to the marketplace...this should be fixed
// - description (string) // long string of prodcut info allows youtube embeds
// - unit (int) // how many copies avaiable
// - views (int) // amount of views on this product
// - price (int)  // in usd
// - previewUrl (string) // url to show on front , watermarket copy
// - productImageUrls (list) //  some products have multiple images (like game assets for slider) except stock photos

const createProduct = async (
  profile,
  category,
  title,
  subCategory,
  addedToMarketplace,
  description,
  unit,
  price,
  previewUrl,
  productImageUrls,
  license,
  changeLogs
) => {
  // ACL setup
  const acl = new Moralis.ACL();

  // only the owner can edit the profile
  acl.setWriteAccess(profile.get('user'), true);
  // public can read the profile
  acl.setPublicReadAccess(true);

  const Product = Moralis.Object.extend('Product');
  const product = new Product();

  product.set('title', title);
  product.set('category', category);
  product.set('subCategory', subCategory);
  product.set('addedToMarketplace', addedToMarketplace);
  product.set('description', description);
  product.set('unit', unit);
  product.set('views', 0);
  product.set('price', price);
  product.set('productImageUrls', productImageUrls);
  product.set('previewUrl', previewUrl); // avaiable after watermark etc
  product.set('license', license);
  product.set('changeLog', changeLogs);

  // relation to profile
  product.set('profile', profile);

  await product.save();
};

//  Profile

// - ACL/CLP
//   - only current user can write to fields
//   - public can read link, name, verified , image, cover
//   - only owner can read the email/write
//   - only admins can write verified field

// - Relations
//   - each profile has at most one user 0 -> 1

/*
If you want the user to have some data
that is public and some that is private,
it’s best to have two separate objects.
You can add a pointer to the private data from the public one.
*/

// Fields
//  - name (string) // Full name
//  - email (string) // To recive notifications
//  - about (string) // Author description
//  - link  (string) // publisher personal url
//  - verified (bool) // Default false
//  - avatar (string) // avatar
//  - cover (string) // banner image
//  - contractAddr (string) //Reference to PazariToken contract that this user owns
//  - notification (dict) // {"promotion" :false , "sells" : true }
//  - userId (string) // User table has some protected access
const createProfile = async (user, name, about, link, avatar, cover, level, notificatons) => {
  // ACL setup
  const acl = new Moralis.ACL();

  // only the owner can edit the profile
  acl.setWriteAccess(user.id, true);
  // public can read the profile
  acl.setPublicReadAccess(true);
  acl.setPublicWriteAccess(false);

  const Profile = Moralis.Object.extend('Profile');

  const profileExistQuery = new Moralis.Query(Profile);

  profileExistQuery.equalTo('user', user);
  const profiles = await profileExistQuery.find();
  if (profiles[0]) {
    console.log('profile already exists');
    return profiles[0];
  }

  const profile = new Profile();
  profile.setACL(acl);
  profile.set('name', name);
  profile.set('about', about);
  profile.set('level', 3);
  profile.set('link', link);
  profile.set('avatar', avatar);
  profile.set('cover', cover);
  profile.set('notification', notificatons);
  profile.set('contractAddr', '');

  let Verified = Moralis.Object.extend('Verified');
  let verified = new Verified();

  verifiedACL = new Moralis.ACL();
  verifiedACL.setPublicReadAccess(true);
  verifiedACL.setRoleWriteAccess('Administrator', true);
  verified.setACL(verifiedACL);
  verified.set('isVerified', 'false');
  await verified.save();
  profile.set('verified', verified);

  // relation to user
  profile.set('user', user);
  profile.set('userId', user.id);

  // handle error
  await profile.save();
  return profile;
};

const saveItems = async (user, category, count) => {
  console.log('SaveItems category: ' + category.get('type') + ', count: ' + count);
  let type = category.get('type');
  for (let i = 0; i < count; i++) {
    let price = Math.floor(Math.random() * 20);
    await createProduct(
      user,
      category,
      categorySeedMap[type][i].title,
      categorySeedMap[type][i].subCategory,
      false,
      categorySeedMap[type][i].description,
      40,
      price,
      categorySeedMap[type][i].previewUrl,
      ['http://url.com/1.png', 'http://url.com/1.png', 'http://url.com/1.png'],
      ['pro', 'personal', 'exclusive'],
      { v1: 'this is a change', v2: 'this is best change' }
    );
  }
};

const getAllProducts = async (type) => {
  const Product = Moralis.Object.extend('Product');
  const Category = Moralis.Object.extend('Category');
  let query = new Moralis.Query(Product);
  let catQuery = new Moralis.Query(Category);
  catQuery.equalTo('type', type);
  query.matchesQuery('category', catQuery);
  await query.find().then((results) => {
    if (results.length > 0) {
      console.log('Product results');
      console.log(results);
    } else {
      console.log('no results found');
    }
  });
};

const getAllProfiles = async (id) => {
  const Profile = Moralis.Object.extend('Profile');
  let query = new Moralis.Query(Profile);

  console.log(id);
  query.equalTo('userId', id);
  await query.find().then((results) => {
    if (results.length > 0) {
      console.log('Profile results');
      console.log(results);
    } else {
      console.log('no results found');
    }
  });
};

const seed = async () => {
  let args = process.argv;

  if (args.length !== 3) {
    console.log('Need user (object) id as argument ');
    return;
  }

  const User = Moralis.Object.extend('User');
  const query = new Moralis.Query(User);

  console.log(Moralis.masterKey);
  console.log(Moralis.serverURL);
  console.log(Moralis.applicationId);

  let user = null;
  await query.get(args[2], { useMasterKey: true }).then(
    (result) => {
      user = result;
    },
    (error) => {
      console.log('Error getting user: ' + error);
    }
  );
  if (!user) {
    console.log('No user found, exiting...');
    return;
  }

  //example category creation with ACL need to do for all types
  let bookCategory = await createCategory(
    'book',
    subCategories.bookCategories,
    filters.bookFilters
  );
  let videoCategory = await createCategory(
    'video',
    subCategories.videoCategories,
    filters.videoFilters
  );
  let gameCategory = await createCategory(
    'game',
    subCategories.gameCategories,
    filters.gameFilters
  );
  let graphicCategory = await createCategory(
    'graphic',
    subCategories.graphicCategories,
    filters.graphicFilters
  );
  let photoCategory = await createCategory(
    'photo',
    subCategories.photoCategories,
    filters.photoFilters
  );
  let audioCategory = await createCategory(
    'audio',
    subCategories.audioCategories,
    filters.audioFilters
  );

  //example create user with admin role example
  await createAdmin(user);

  //example create a user profile
  let profile = await createProfile(
    user,
    'Name',
    'About Author blah blah lorem',
    'Link',
    'Avatar.com/1.png',
    'Cover.com/2.png',
    {
      setting: 'ok'
    }
  );

  // getAllProducts("book");
  // getAllProfiles(user.id);
  // example create a product
  saveItems(profile, bookCategory, 5);
  saveItems(profile, videoCategory, 5);
  saveItems(profile, gameCategory, 2);
  saveItems(profile, graphicCategory, 1);
  saveItems(profile, photoCategory, 5);
  saveItems(profile, audioCategory, 5);
};
seed();

const categorySeedMap = {
  book: [
    {
      title: 'Moby Dick',
      description: 'A tale about a whale',
      subCategory: 'Classic',
      previewUrl:
        'https://motionarray.imgix.net/preview-1027354-4isy6dvmbv6R4qj3-large.jpg?w=1400&q=60&fit=max&auto=format'
    },
    {
      title: 'Game of Thrones',
      description: 'Story about Westeros',
      subCategory: 'Fantasy',
      previewUrl:
        'https://motionarray.imgix.net/preview-1027354-4isy6dvmbv6R4qj3-large.jpg?w=1400&q=60&fit=max&auto=format'
    },
    {
      title: 'Of Mice and Men',
      description: 'Lennie',
      subCategory: 'Classic',
      previewUrl:
        'https://motionarray.imgix.net/preview-1027354-4isy6dvmbv6R4qj3-large.jpg?w=1400&q=60&fit=max&auto=format'
    },
    {
      title: 'Intro to Algorithms',
      description: 'Not a fun book',
      subCategory: 'Programming',
      previewUrl:
        'https://motionarray.imgix.net/preview-1027354-4isy6dvmbv6R4qj3-large.jpg?w=1400&q=60&fit=max&auto=format'
    },
    {
      title: '1984',
      description: 'Big brother',
      subCategory: 'Classic',
      previewUrl:
        'https://motionarray.imgix.net/preview-1027354-4isy6dvmbv6R4qj3-large.jpg?w=1400&q=60&fit=max&auto=format'
    }
  ],
  video: [
    {
      title: 'Foo',
      description: 'Blah blah',
      subCategory: 'Sports',
      previewUrl: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1045970-aycmOAlpNs-high.mp4'
    },
    {
      title: 'Bar',
      description: 'Blah blah',
      subCategory: 'Sports',
      previewUrl: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1045970-aycmOAlpNs-high.mp4'
    },
    {
      title: 'Foobar',
      description: 'Blah',
      subCategory: 'Sports',
      previewUrl: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1045970-aycmOAlpNs-high.mp4'
    },
    {
      title: 'Blah',
      description: 'Blah',
      subCategory: 'Sports',
      previewUrl: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1045970-aycmOAlpNs-high.mp4'
    },
    {
      title: 'Test',
      description: 'Blah',
      subCategory: 'Sports',
      previewUrl: 'https://dsqqu7oxq6o1v.cloudfront.net/motion-array-1045970-aycmOAlpNs-high.mp4'
    }
  ],
  game: [
    {
      title: 'Foo',
      description: 'Blah blah',
      subCategory: 'Creatures',
      previewUrl: 'https://cdn.gamingdose.com/wp-content/uploads/2021/02/Ninja-Gaiden-2.jpg'
    },
    {
      title: 'Bar',
      description: 'Blah blah',
      subCategory: 'Creatures',
      previewUrl: 'https://cdn.gamingdose.com/wp-content/uploads/2021/02/Ninja-Gaiden-2.jpg'
    },
    {
      title: 'Foobar',
      description: 'Blah',
      subCategory: 'Creatures',
      previewUrl: 'https://cdn.gamingdose.com/wp-content/uploads/2021/02/Ninja-Gaiden-2.jpg'
    },
    {
      title: 'Blah',
      description: 'Blah',
      subCategory: 'Creatures',
      previewUrl: 'https://cdn.gamingdose.com/wp-content/uploads/2021/02/Ninja-Gaiden-2.jpg'
    },
    {
      title: 'Test',
      description: 'Blah',
      subCategory: 'Creatures',
      previewUrl: 'https://cdn.gamingdose.com/wp-content/uploads/2021/02/Ninja-Gaiden-2.jpg'
    }
  ],
  graphic: [
    {
      title: 'Foo',
      description: 'Blah blah',
      subCategory: 'Backgrounds',
      previewUrl: 'https://cdn.gamingdose.com/wp-content/uploads/2021/02/Ninja-Gaiden-2.jpg'
    },
    {
      title: 'Bar',
      description: 'Blah blah',
      subCategory: 'Backgrounds',
      previewUrl: 'https://cdn.gamingdose.com/wp-content/uploads/2021/02/Ninja-Gaiden-2.jpg'
    },
    {
      title: 'Foobar',
      description: 'Blah',
      subCategory: 'Backgrounds',
      previewUrl: 'https://cdn.gamingdose.com/wp-content/uploads/2021/02/Ninja-Gaiden-2.jpg'
    },
    {
      title: 'Blah',
      description: 'Blah',
      subCategory: 'Backgrounds',
      previewUrl: 'https://cdn.gamingdose.com/wp-content/uploads/2021/02/Ninja-Gaiden-2.jpg'
    },
    {
      title: 'Test',
      description: 'Blah',
      subCategory: 'Backgrounds',
      previewUrl: 'https://cdn.gamingdose.com/wp-content/uploads/2021/02/Ninja-Gaiden-2.jpg'
    }
  ],
  photo: [
    {
      title: 'Foo',
      description: 'Blah blah',
      subCategory: 'Fashion',
      previewUrl: 'https://cdn.gamingdose.com/wp-content/uploads/2021/02/Ninja-Gaiden-2.jpg'
    },
    {
      title: 'Bar',
      description: 'Blah blah',
      subCategory: 'Fashion',
      previewUrl: 'https://cdn.gamingdose.com/wp-content/uploads/2021/02/Ninja-Gaiden-2.jpg'
    },
    {
      title: 'Foobar',
      description: 'Blah',
      subCategory: 'Fashion',
      previewUrl: 'https://cdn.gamingdose.com/wp-content/uploads/2021/02/Ninja-Gaiden-2.jpg'
    },
    {
      title: 'Blah',
      description: 'Blah',
      subCategory: 'Fashion',
      previewUrl: 'https://cdn.gamingdose.com/wp-content/uploads/2021/02/Ninja-Gaiden-2.jpg'
    },
    {
      title: 'Test',
      description: 'Blah',
      subCategory: 'Fashion',
      previewUrl: 'https://cdn.gamingdose.com/wp-content/uploads/2021/02/Ninja-Gaiden-2.jpg'
    }
  ],
  audio: [
    {
      url: 'https://www.mfiles.co.uk/mp3-downloads/scott-joplin-the-cascades.mp3',
      title: 'The cascades',
      author: 'Scott Joplin',
      priceUsd: 100,
      BPM: 40,
      duration: 2.34
    },

    {
      url: 'https://www.mfiles.co.uk/mp3-downloads/silent-night.mp3',
      title: 'Silent night',
      author: 'Scott Joplin',
      priceUsd: 120,
      BPM: 110,
      duration: 2.34
    },

    {
      url: 'https://www.mfiles.co.uk/mp3-downloads/chopin-nocturne-op9-no2.mp3',
      title: 'nocturne-op9-no2',
      author: 'Chopin',
      priceUsd: 100,
      BPM: 70,
      duration: 3.22
    },

    {
      url: 'https://www.mfiles.co.uk/mp3-downloads/scott-joplin-the-cascades.mp3',
      title: 'The cascades',
      author: 'Scott Joplin',
      priceUsd: 200,
      BPM: 90,
      duration: 1.34
    }
  ]
};
