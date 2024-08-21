import Category from "./components/category"
import Header from "./components/header"
import Main from "./components/mainsection"
import VotingCard, { VotingSuccessModal } from "./components/modal"
import { useEffect, useState } from "react"

const saveVotes = localStorage.getItem('hasVoted')

function App() {
  const [openForm, setOpenForm] = useState(false)
  const [castVote, setCastVote] = useState(false)
  const [category, setCategory] = useState({})
  const [categoryLength, setCategoryLength] = useState(null)
  const [hasVoted, setHasVoted] = useState(
    saveVotes ? JSON.parse(saveVotes) : {}
  )
  async function fetchCategories() {
    try {
      const response = await fetch(
        "https://rate-your-mentor.fly.dev/api/categories"
      );
      const categories = await response.json();
      return setCategoryLength(categories.length)
    } catch (error) {
      console.log(error);
      console.log("not found");
    }
  }
  useEffect(() => {
    localStorage.setItem('hasVoted', JSON.stringify(hasVoted))
  }, [hasVoted])

  useEffect(() => {
    fetchCategories()
  }, [])
  const isNotEmpty = (category) => {
    return Object.keys(category).length !== 0 && category.constructor === Object;
  }

  function handleVoteStatus(id) {
    console.log(id)
    setHasVoted((prev) =>
    ({
      ...prev,
      [id]: true,
    })
    )
  }
  return (
    <>
      <Header />
      <Main>
        {
          isNotEmpty &&
          (!openForm ?
            (
              <Category
                id={category.id}
                openForm={openForm}
                setOpenForm={setOpenForm}
                hasVoted={hasVoted}
                category={category}
                categoryLength = {categoryLength}
                setCategory={setCategory}
                totalVotes = {category.total_votes}
                mentorPerCategory = {category.total_votes_by_mentor}
              />
            )
            :
            (
              <VotingCard
                setCastVote={setCastVote}
                categoryName={category.name}
                categoryID={category.id}
              />
            )
          )
        }
        {
          castVote &&
          (
            <VotingSuccessModal
              id={category.id}
              setOpenForm={setOpenForm}
              setCastVote={setCastVote}
              handleVoteStatus={handleVoteStatus}

            />
          )
        }
      </Main>
    </>
  )
}

export default App
