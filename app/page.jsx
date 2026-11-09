
import Loading from './components/page'
import Hero from './components/Hero'
import Search from './components/Search'
import TeamSection from './components/TeamSection'
import PastDeals from './components/PastDeals'
import DHAblog from './components/DHAblog'
import CardStack from './components/CardStack'
export default function MyApp({ Component, pageProps }) {
  return (
    <main >
      <Loading />
	  <Hero/>
      <Search />
	  <DHAblog />
      <CardStack />
      <TeamSection />
      <PastDeals />
    </main>
  )
}
