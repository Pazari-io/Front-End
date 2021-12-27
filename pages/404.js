import Link from 'next/link';
import Error404 from '../public/images/404.png';
import Image from 'next/image';
export default function Custom404() {
  return (
    <div className="min-h-screen text-gray-300 bg-gray-900">
      <Link href="/">
        <Image src={Error404} className="cursor-pointer" />
      </Link>
    </div>
  );
}
