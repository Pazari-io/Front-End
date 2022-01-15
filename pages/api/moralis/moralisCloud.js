/*
To publish this moralis cloud function open up admin.moralis.io/servers and click 'Cloud Functions' on your server page.
Then run the commands listed under 'Set up Cloud Functions in your IDE'
*/
Moralis.Cloud.afterSave('TokenListingsss', (request) => {
  let item = request.object;
  //Check if it's already been received.  Might have to change this logic for production
  if (request.object.get('confirmed')) {
    return;
  }

  return Moralis.Cloud.httpRequest({
    url: item.get('uri')
  }).then(
    async function (httpResponse) {
      // success
      let json = httpResponse.data;
      const catQuery = new Moralis.Query('Category');
      catQuery.equalTo('type', json.type);
      const category = await catQuery.first();

      const profileQuery = new Moralis.Query('Profile');
      profileQuery.equalTo('ethAddress', item.get('sender'));
      const profile = await profileQuery.first();

      const acl = new Moralis.ACL();
      // only the owner can edit the profile
      acl.setWriteAccess(item.get('sender'), true);
      // public can read the profile
      acl.setPublicReadAccess(true);

      const Product = Moralis.Object.extend('Product');
      const product = new Product();

      product.set('title', json.name);
      product.set('category', category);
      product.set('subCategory', json.subCategory);
      product.set('addedToMarketplace', true);
      product.set('description', json.description);
      product.set('unit', parseInt(item.get('amount')));
      product.set('views', 0);
      product.set('price', parseInt(item.get('price')));
      product.set('productImageUrls', ['https://test.url']);
      product.set(
        'previewUrl',
        'https://motionarray.imgix.net/preview-1027354-4isy6dvmbv6R4qj3-large.jpg?w=1400&q=60&fit=max&auto=format'
      ); // avaiable after watermark etc
      product.set('license', ['pro', 'personal', 'exclusive']);
      product.set('changeLog', {
        v1: 'this is a change',
        v2: 'this is best change'
      });

      // relation to profile
      product.set('profile', profile);

      await product.save();
      console.log('saved product');
    },
    function (httpResponse) {
      // error
      console.error('Request failed with response code ' + httpResponse.status);
    }
  );
});
