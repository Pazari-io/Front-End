import Nav from './NavBar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
