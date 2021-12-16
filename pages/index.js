import Nav from '../components/NavBar';
import Search from '../components/Search';
import Footer from '../components/Footer';
import Slider from '../components/Slider';
import Card from '../components/Card';

// if you see SVG console errors it seems to be a react
// bug https://github.com/facebook/react/issues/15187
// there should be a fix for this but not concerning

export default function Home() {
  return (
    <main className="min-h-screen mx-auto dark:bg-gray-900">
      <Nav />
      <Search />

      <h1 className="px-2 py-2 text-3xl dark:text-indigo-600">On Fire </h1>

      <Slider />

      <h1 className="px-2 py-2 text-3xl dark:text-indigo-600">ML recommended </h1>

      <Slider />

      <h1 className="px-2 py-2 text-3xl dark:text-indigo-600">Best of this month </h1>

      <Slider />

      <Footer />
    </main>
  );
}
