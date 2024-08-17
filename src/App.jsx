import { CastVoteButton } from "./components/buttons"
import Category, { CategoryCard } from "./components/category"
import Header from "./components/header"
import Main from "./components/mainsection"
import VotingCard, { VotingSuccessModal } from "./components/modal"

function App() {

  return (
    <>
      <Header/>
      <Main>
      <Category>
        <CategoryCard/>
        <CastVoteButton/>
      </Category>
      <VotingCard/>
      <VotingSuccessModal/>
      </Main>
    </>
  )
}

export default App
