import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  let slug = router.query.slug;

  return (
    <div>
      <div className="flex justify-center w-full pt-10 bg-orange-300 ">
        <Image
          src={'/HP.jpeg'}
          alt="Picture of something nice"
          width={250}
          height={300}
          className="rounded-lg cursor-pointer"
        />
      </div>
      <p className="flex justify-center w-full pt-4 text-xl font-bold text-white bg-orange-300 ">
        Harry Potter
      </p>

      <div className="flex justify-between w-full pt-4 text-sm text-gray-100 bg-orange-300 px-14">
        <p>Rating</p>
        <p>Pages</p>
        <p>Language</p>
        <p>Audio</p>
      </div>

      <div className="flex justify-between w-full pt-4 text-lg font-bold text-white bg-orange-300 px-14">
        <p>4.7</p>
        <p>240</p>
        <p>ENG</p>
        <p>0.2 Hr</p>
      </div>

      <h1 className="px-8 py-2 text-2xl font-bold">What's it about?</h1>

      <p className="px-8">
        Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling.
        The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione
        Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and
        Wizardry. The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard
        who intends to become immortal, overthrow the wizard governing body known as the Ministry of
        Magic and subjugate all wizards and Muggles (non-magical people).
      </p>

      <h1 className="px-8 py-2 text-2xl font-bold">Who's it for?</h1>

      <p className="px-8">
        Since the release of the first novel, Harry Potter and the Philosopher's Stone, on 26 June
        1997, the books have found immense popularity, positive reviews, and commercial success
        worldwide. They have attracted a wide adult audience as well as younger readers and are
        often considered cornerstones of modern young adult literature.[2] As of February 2018, the
        books have sold more than 500 million copies worldwide, making them the best-selling book
        series in history, and have been translated into eighty languages.[3] The last four books
        consecutively set records as the fastest-selling books in history, with the final instalment
        selling roughly 2.7 million copies in the United Kingdom and 8.3 million copies in the
        United States within twenty-four hours of its release.
      </p>
    </div>
  );
}
