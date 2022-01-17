import Nav from '../components/NavBar';
import Footer from '../components/Footer';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
