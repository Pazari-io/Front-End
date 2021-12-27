export default async function handler(req, res) {
  let books = {};
  await fetch('https://gutendex.com/books/')
    .then((res) => res.json())
    .then((json) => {
      books = json;
      //console.log(json["results"])
    });

  let selected = [];

  books['results'].map((book) => {
    if (book['formats']['image/jpeg'].includes('medium')) {
      //console.log(book['formats']['image/jpeg']);
      selected.push(book);

      // book["authors"].map(author => {
      //     console.log(author)
      // })
    }
  });

  res.status(200).json({ books: books, error: null });
}
