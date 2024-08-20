import Category from "./components/category"
import Header from "./components/header"
import Main from "./components/mainsection"
import VotingCard, { VotingSuccessModal } from "./components/modal"
import { useState } from "react"

function App() {

  const [castVote, setCastVote]= useState(false)
  const [vote,setVote]= useState(false)
  const [category, setCategory] = useState({})
  const [hasVoted, setHasVoted] = useState(false)

  return (
    <>
      <Header/>
      <Main>
        {
          !castVote ? <Category castVote={castVote} setCastVote= {setCastVote} hasVoted = {hasVoted} category={category} setCategory={setCategory}/> : <VotingCard vote={vote} setVote={setVote} categoryName= {category.name} categoryID={category.id}/>
        }
        {vote && <VotingSuccessModal setCastVote={setCastVote} setVote={setVote} setHasVoted ={setHasVoted} />}
      </Main>
    </>
  )
}

export default App
