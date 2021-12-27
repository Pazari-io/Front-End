export default async function handler(req, res) {
  // this is crazy lazy

  let bookCategories = [
    'Computer',
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

  let data = {};
  await fetch('https://api.iconfinder.com/v4/icons/search?query=Fuck&count=10&premium=0&vector=1', {
    method: 'get',
    headers: new Headers({
      Authorization: 'Bearer ' + 'X0vjEUN6KRlxbp2DoUkyHeM0VOmxY91rA6BbU5j3Xu6wDodwS0McmilLPBWDUcJ1',
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  })
    .then((res) => res.json())
    .then((json) => {
      data = json;
      //console.log(data);
    });

  console.log(data);
  res.status(200).json({ icons: data['icons'], error: null });
}
