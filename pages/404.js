import Link from 'next/link';
import Error404 from '../public/images/404.png';
import Image from 'next/image';
export default function Custom404() {
  return (
    <div className=" text-gray-300 bg-gray-900">
      <Link href="/" passHref={true}>
        <a>
          <Image alt="error" src={Error404} className="cursor-pointer" />
        </a>
      </Link>
    </div>
  );
}
