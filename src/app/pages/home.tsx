import Hero from "@/components/hero";
import HowItWorks from "@/components/steps";
import Navbar from "../layouts/navbar";
import Footer from "@/components/footer";
import Basics from "@/components/basic";
const Home = () => {
  return (
  <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Basics />
      <Footer />
    </main>
  )
}

 

export default Home