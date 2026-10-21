
import Loading from './components/page'
import Hero from './components/Hero'
import Search from './components/Search'
import TeamSection from './components/TeamSection'
import PastDeals from './components/PastDeals'
export default function MyApp({ Component, pageProps }) {
  return (
    <main >
      <Loading />
	  <Hero/>
      <Search />
      <TeamSection />
      <PastDeals />
    </main>
  )
}
