import Header from "./LandingPage/Header/page";
import HeroSection from "./LandingPage/Hero/page";
import FeaturesSection from "./LandingPage/Features/page";
import ChartSection from "./LandingPage/chartSection/page";
import Footer from "./LandingPage/Footer/page";
import Head from 'next/head';


export default function LandingPage() {
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


