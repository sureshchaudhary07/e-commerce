import PopularBrands from "@/components/custom/Brands";
import PopularCategories from "@/components/custom/Categories";
import FAQ from "@/components/custom/Faq";
import Footer from "@/components/custom/Footer";
import HomePage from "@/components/custom/Homepage";
import Navbar from "@/components/custom/Navbar";
import PopularProducts from "@/components/custom/PopularProducts";
import ServicesFeatures from "@/components/custom/Servies"
export default function Home() {
  return (
    <>
    <Navbar/>
    <HomePage/>
    <PopularCategories/>
    <PopularProducts/>
    <ServicesFeatures/>
    <PopularBrands/>
    <FAQ/>
    <Footer/>
    </>
  );
}