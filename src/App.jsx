import Header from './components/Header'
import Hero from './components/Hero'
import WhyUs from './components/WhyUs'
import Services from './components/Services'
import Calculator from './components/Calculator'
import Clients from './components/Clients'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-forest-950 text-cream-50 relative selection:bg-gold-500 selection:text-ink-900">
      <Header />
      <main className="relative">
        <Hero />
        <WhyUs />
        <Services />
        <Calculator />
        <Clients />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}