/**
 * To run: node scripts/seeder.js
 * populating seed data into database
 **/

// CPL needs to be set before production
// no create field, mostly read only tables

const Moralis = require('moralis/node');
const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_ID;
Moralis.start({ serverUrl, appId });

// Add a user to the admin role
const createAdmin = async (user) => {
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
//- categories (list) // all categories
//- filters (list) // all filters for that category

// create categories and filters only admin can write everyone can read it
const createCategory = async (type, categories, filters) => {
  // only admin can write to this object
  const acl = new Moralis.ACL();
  acl.setRoleWriteAccess('Administrator', true);
  acl.setPublicReadAccess(true);

  const Category = Moralis.Object.extend('Category');
  const category = new Category();

  query = new Moralis.Query(Category);
  query.equalTo('type', type);
  found = false;
  await query.find().then((results) => {
    if (results.length > 0) {
      found = true;
    }
  });

  // only allow unique types
  if (found) return;

  category.set('type', type);
  category.addUnique('categories', categories);
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
// - tags (list)
// - description (string) // long string of prodcut info allows youtube embeds
// - unit (int) // how many copies avaiable
// - views (int) // amount of views on this product
// - price (int)  // in usd
// - productImageUrls (list) //  some products have multiple images (like game assets for slider) except stock photos
// - previewUrl (string) // url to show on front , watermarket copy

const createProduct = async (
  user,
  title,
  tags,
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
  acl.setWriteAccess(user.id, true);
  // public can read the profile
  acl.setPublicReadAccess(true);

  const Product = Moralis.Object.extend('Product');
  const product = new Product();

  product.set('title', title);
  product.set('tags', tags);
  product.set('description', description);
  product.set('unit', unit);
  product.set('views', 0);
  product.set('price', price);
  product.set('productImageUrls', productImageUrls);
  product.set('previewUrl', previewUrl); // avaiable after watermark etc
  product.set('license', license);
  product.set('changeLog', changeLogs);

  // relation to user
  product.set('user', user);

  await product.save();
};

//  Profile

// - ACL/CLP
//   - only current user can write to fields
//   - public can read link, name, verfied , image, cover
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
//  - verfied (bool) // Default false
//  - avatar (string) // avatar
//  - cover (string) // banner image
//  - notification (dict) // {"promotion" :false , "sells" : true }
const createProfile = async (user, name, about, link, avatar, cover, notificatons) => {
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
  }

  const profile = new Profile();
  profile.setACL(acl);
  profile.set('name', name);
  profile.set('about', about);
  profile.set('link', link);
  profile.set('avatar', avatar);
  profile.set('cover', cover);
  profile.set('notification', notificatons);

  let Verfied = Moralis.Object.extend('Verfied');
  let verfied = new Verfied();

  verifiedACL = new Moralis.ACL();
  verifiedACL.setPublicReadAccess(true);
  verifiedACL.setRoleWriteAccess('Administrator', true);
  verfied.setACL(verifiedACL);
  verfied.set('isVerfied', 'false');
  await verfied.save();
  profile.set('verified', verfied);

  // relation to user
  profile.set('user', user);

  // handle error
  await profile.save();
};

const bookFilters = [
  {
    id: 'properties',
    name: 'Properties',
    options: [
      { value: 'verfied', label: 'Verfied publisher', checked: true },
      { value: 'exclusive', label: 'Exclusive release', checked: true },
      { value: 'hasaudio', label: 'With audio', checked: false },
      { value: 'waterfree', label: 'No watermarks', checked: false },
      { value: 'permissions', label: 'Full permissions', checked: false }
    ]
  },
  {
    id: 'age',
    name: 'Age',
    options: [
      { value: 'every', label: 'Every age', checked: false },
      { value: 'kids', label: 'Kids', checked: false },
      { value: 'young', label: 'Young adults', checked: true },
      { value: 'adults', label: '+18', checked: false }
    ]
  },
  {
    id: 'length',
    name: 'Length',
    options: [
      { value: 'lessthan100', label: 'Less than 100 pages', checked: false },
      { value: 'morethan100', label: 'More than 100 pages', checked: false },
      { value: 'morethan300', label: 'More than 300 pages', checked: false }
    ]
  }
];

let bookCategories = [
  'Computer',
  'Programming',
  'Design',
  'Action',
  'Adventure',
  'Art',
  'Aarchitecture',
  'Autobiography',
  'Anthology',
  'Biography',
  'Business',
  'Children',
  'Crafts',
  'Classic',
  'Cookbook',
  'Comic',
  'Diary',
  'Encyclopedia',
  'Drama',
  'Guide',
  'Fairytale',
  'Security',
  'Fitness',
  'Health',
  'Fantasy',
  'History',
  'Home',
  'Historical',
  'Garden',
  'Humor',
  'Horror',
  'Journal',
  'Mystery',
  'Math',
  'Paranormal',
  'Memoir',
  'Philosophy',
  'Poetry',
  'Prayer',
  'Political',
  'Religion',
  'Romance',
  'Fiction',
  'Review',
  'Short',
  'Science',
  'Suspense',
  'Help',
  'Thriller',
  'Sports',
  'Western',
  'Travel',
  'Young',
  'Crime'
];

const seed = async () => {
  const User = Moralis.Object.extend('User');
  const query = new Moralis.Query(User);

  let user = null;
  await query.get('QEz0JDPCrCCViMNbAToYp6et').then((result) => {
    user = result;
  });

  //example category creation with ACL need to do for all types
  //await createCategory('Books', bookCategories, bookCategories);

  //example create user with admin role example
  //await createAdmin(user);

  //example create a user profile
  //await createProfile(
  //     user,
  //     'Name',
  //     'About Author blah blah lorem',
  //     'Link',
  //     'Avatar.com/1.png',
  //     'Cover.com/2.png',
  //     {
  //       setting: 'ok'
  //     }
  //   );
  // };

  // example create a product
  await createProduct(
    user,
    'Awesome Product',
    ['nice', 'good', 'lel'],
    'This is my the best creation',
    40,
    4000,
    'http://url.com/1.png',
    ['http://url.com/1.png', 'http://url.com/1.png', 'http://url.com/1.png'],
    ['pro', 'personal', 'exclusive'],
    { v1: 'this is a change', v2: 'this is best change' }
  );
};
seed();
