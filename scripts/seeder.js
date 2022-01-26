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
  taskId,
  license,
  changeLogs
) => {
  // ACL setup
  const acl = new Moralis.ACL();

  // only the owner can edit the profile
  acl.setWriteAccess(profile.get('user'), true);
  // public can read the profile
  acl.setPublicReadAccess(true);

  const TaskID = Moralis.Object.extend('TaskIds');
  const taskid = new TaskID();
  taskid.set('taskId', taskId);
  const savedTask = await taskid.save();

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
  product.set('taskId', savedTask);
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

  let pazariImages = [
    'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/gc1.png',
    'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/gc2.png',
    'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/gc3.png',
    'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/p1.png',
    'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/p2.png',
    'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/p3.png',
    'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/b1.png',
    'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/b2.png',
    'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/b3.png'
  ];

  const random = pazariImages[Math.floor(Math.random() * pazariImages.length)];

  let type = category.get('type');

  let taskId = '';

  switch (type) {
    case 'book':
      taskId =
        'Li91cGxvYWRzL29yaWdpbmFsLzMwYzA3ZDAyZjBjMTgyZTc1OWIwMTNmYmEwOGJhOWE3NDFjNTBlMjBjZDE2YzhmMDk4MThlODk2ODBlYjQwMTMucGRm';
      break;

    case 'video':
      taskId =
        'Li91cGxvYWRzL29yaWdpbmFsL2YxY2I1ZDFkNDhjYWQ5ZTFhZGZmYWY2ZWM4MDFlZjQzNzNkODE2MTg4NDE2MjMyMjUxN2Q5MzkyYjgzZWNjZjMubXA0';
      break;

    case 'photo':
      taskId =
        'Li91cGxvYWRzL29yaWdpbmFsLzI1YTQ0MWUyYjQ1ZmEzNWYyOTkzODM2ZGM4MzM0ZGI1ODljMDEyNTIwZDlhN2RmYjQ0OWM4ZmY5NTgxYmVhZjQucG5n';
      break;

    case 'graphic':
      taskId =
        'Li91cGxvYWRzL29yaWdpbmFsL2MxNWMwMzJhODM1YTJkNjEyNzhiY2ZjODdmMjZiMzA2Mzc4NWNiMTM3ODQ0YWJmODFhMDcwZTNhNzQ5ZWM4MWMucG5n';
      break;

    case 'game':
      taskId =
        'Li91cGxvYWRzL29yaWdpbmFsLzg2OTEwYTc1MzI0ODRlOGZjNDI4Mzk0OTgwYTFiMTYxZjViNDVjOGM4ZDU5ZTMxZjNlZTYzN2RkZWRmNGIwYmEucG5n';
      break;

    case 'audio':
      taskId =
        'Li91cGxvYWRzL29yaWdpbmFsL2U0NzA2YWJmNzhkOTU3NGEyZDU5ZDkyODdmZmM0YmUxYTJkZTNiMWJjNTBkMWI0YWU0NjRlNmEyNmQyODI5ODYubXAz';
      break;
  }

  for (let i = 0; i < count; i++) {
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    let price = getRandomInt(1000000000000000000, 3000000000000000000);
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
      [random, random, random],
      taskId,
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
    'Pazari',
    'My work ranges from the context of the street to museums, movie theaters, to presentations of sound through parking meters.  Often focusing on the trappings of power and the rituals needed for it’s effect, or evoking the traditional distancing of the supplicant by those in power, giving voice to those who are often unheard, or revealing the power of language through history.  The work takes on various forms intended to draw in the viewer as co-author and witness, create new and unpredictable cycles of thoughts and associations, providing an experimental chance to challenge one’s perceptions, perspectives and assumptions.',
    'https://pazari.io',
    'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/pavatar.png',
    'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/pcover.png',
    {
      sales: true,
      product: true
    }
  );

  // getAllProducts("book");
  // getAllProfiles(user.id);
  // example create a product
  saveItems(profile, bookCategory, 3);
  saveItems(profile, videoCategory, 3);
  saveItems(profile, gameCategory, 3);
  saveItems(profile, graphicCategory, 3);
  saveItems(profile, photoCategory, 3);
  saveItems(profile, audioCategory, 3);
};
seed();

const categorySeedMap = {
  book: [
    {
      title: 'Awesome Book I',
      description:
        'Despite finding a rustic cabin in the clearing, they do not enter. Fabrizio and Riccardo find three deformed scarecrows crucified with pig heads on stakes in a kind of altar. Terrified, they leave. After Elisa enters the cottage, she discovers a ritualistic mural depicting three deities: Ostro, Mastosso and Carcagnosso, which symbolize the leadership of a group that worships them in exchange for abundance and riches through human sacrifice. They decide to spend the night in the RV. When they hear screams coming from inside the house, everyone but Mark decides to go into the house to investigate. In the attic of the house, they discover a girl trapped inside a cocoon of hay. The group is horrified to discover the girl has had her tongue mutilated.',
      subCategory: 'Classic',
      previewUrl: 'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/b1.png'
    },
    {
      title: 'Awesome Book II',
      description: 'Story about Westeros',
      subCategory: 'Fantasy',
      previewUrl: 'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/b2.png'
    },
    {
      title: 'Awesome Book III',
      description:
        "After being hired at a farm, the pair are confronted by Curley—the Boss's small, aggressive son with a Napoleon complex who dislikes larger men. Curley starts to target Lennie. Curley's flirtatious and provocative underaged wife, to whom Lennie is instantly attracted, poses a problem as well. In contrast, the pair also meets Candy, an elderly ranch handyman with one hand and a loyal dog, and Slim, an intelligent and gentle jerkline-skinner whose dog has recently had a litter of puppies. Slim gives a puppy to Lennie and Candy, whose loyal, accomplished sheep dog was put down by fellow ranch-hand Carlson.",
      subCategory: 'Classic',
      previewUrl: 'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/b3.png'
    }
  ],
  video: [
    {
      title: 'Crazy Art I',
      description: "beautiful isn't it ?",
      subCategory: 'Arts',
      previewUrl: 'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/v1.mp4'
    },
    {
      title: 'Crazy Art II',
      description: "peacful isn't it ?",
      subCategory: 'Arts',
      previewUrl: 'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/v2.mp4'
    },
    {
      title: 'Crazy Art II',
      description: "nice isn't it ?",
      subCategory: 'Arts',
      previewUrl: 'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/v3.mp4'
    }
  ],
  game: [
    {
      title: 'Game Asset I',
      description: `This is a new pack, featuring new models, separate from my others.
      Mega Pack means a large collection of modular pieces and props for vast scene creations!
      `,
      subCategory: 'Creatures',
      previewUrl: 'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/g1.png'
    },
    {
      title: 'Game Asset II',
      description: `Nature items ranging from small to huge trees, rocks and grouped rocks, ranging from small pebbles to larger boulders, bushes and flowers, and 1 grass and 1 yellow flower texture to paint detail onto your terrain scene!
      `,
      subCategory: 'Creatures',
      previewUrl: 'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/g2.png'
    },
    {
      title: 'Game Asset III',
      description: `have included a public demo scene for all to try before you buy! Join my discord, and head over to the tab called #demo-scenes, and you'll find a .zip file to download and play!
      `,
      subCategory: 'Creatures',
      previewUrl: 'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/g3.png'
    }
  ],
  graphic: [
    {
      title: 'Sick Graphics I',
      description: 'The graphics for your website',
      subCategory: 'Backgrounds',
      previewUrl: 'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/gc1.png'
    },
    {
      title: 'Sick Graphics II',
      description: 'The graphics for your blog',
      subCategory: 'Backgrounds',
      previewUrl: 'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/gc2.png'
    },
    {
      title: 'Sick Graphics III',
      description: 'The graphics for your web3 project',
      subCategory: 'Backgrounds',
      previewUrl: 'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/gc3.png'
    }
  ],
  photo: [
    {
      title: 'Cool Photo I',
      description: 'cool it is',
      subCategory: 'Fashion',
      previewUrl: 'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/p1.png'
    },
    {
      title: 'Cool Photo II',
      description: 'Here is your photo',
      subCategory: 'Fashion',
      previewUrl: 'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/p2.png'
    },
    {
      title: 'Cool Photo III',
      description: 'buy and own it for ever',
      subCategory: 'Fashion',
      previewUrl: 'https://pazari-storage.sgp1.cdn.digitaloceanspaces.com/MVP/p3.png'
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
