import Nav from '../components/NavBar';
import Footer from '../components/Footer';

export default function Layout({ children }) {
  return (
    <body className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow">{children}</main>
      <Footer />
    </body>
  );
}
