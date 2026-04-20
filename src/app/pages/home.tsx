import Hero from "@/shared/components/hero"
import Navbar from "../layouts/navbar"
import HowItWorks from "@/shared/components/steps"
import Basics from "@/shared/components/basic"
import Footer from "@/shared/components/footer"

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