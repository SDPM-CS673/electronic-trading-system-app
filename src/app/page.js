import Image from "next/image";
import styles from "./page.module.css";
import Header from "../Components/LandingPage/Header/page";
import HeroSection from "../Components/LandingPage/Hero/page";
import FeaturesSection from "../Components/LandingPage/Features/page";
import ChartSection from "../Components/LandingPage/chartSection/page";
import Footer from "../Components/LandingPage/Footer/page";
import Head from 'next/head';
export default function Home() {
  return (
    <div>
      <Head>
      <title>Stock Market Landing Page</title>
      <meta name="description" content="Modern stock market trading platform" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header/>
    <main>
      <HeroSection />
      <FeaturesSection />

    </main>
    <Footer />
    </div>



  );
}
