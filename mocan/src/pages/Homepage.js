import Navbar from '../components/Home/Navbar';
import Banner   from '../components/Home/Banner';
import Topselling from '../components/Home/Topselling';
import Footer from '../components/Home/Footer';
export default function Homepage() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Topselling />
      <Footer />
    </div>
  );
}
