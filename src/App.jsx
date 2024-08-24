import Category from "./components/category"
import Header from "./components/header"
import Main from "./components/mainsection"
import VotingCard, { VotingSuccessModal } from "./components/voting"
import { useEffect, useState } from "react"
//
const saveVotes = localStorage.getItem('hasVoted')
const fetchCategoriesEndpoint = "https://rate-your-mentor.fly.dev/api/categories"
//
function App() {
  //
  const [openForm, setOpenForm] = useState(false)
  const [castVote, setCastVote] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [categoryItem, setCategoryItem] = useState({})
  const [categoryList, setCategoryList] = useState([])
  const [hasVoted, setHasVoted] = useState(
    saveVotes ? JSON.parse(saveVotes) : {}
  )
  const isNotEmpty = (categoryItem) => {
    return Object.keys(categoryItem).length !== 0 && categoryItem.constructor === Object;
  }
  //
  async function fetchCategories() {
    try {
      const response = await fetch(fetchCategoriesEndpoint);
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }
      const categories = await response.json();
      console.log(categories)
      return setCategoryList(categories)
    } catch (error) {
      console.error(error);
      console.error("not found");
    }
  }
  //
  useEffect(() => {
    localStorage.setItem('hasVoted', JSON.stringify(hasVoted))
  }, [hasVoted])
  //
  useEffect(() => {
    fetchCategories()
  }, [])
  //
  function handleVoteStatus(id) {
    setHasVoted((prev) =>
    ({
      ...prev,
      [id]: true,
    })
    )
  }
  //
  return (
    <>
      <Header />
      <Main>
        {
          (
            isNotEmpty &&
            (!openForm ?
              (
                <Category
                  id={categoryItem?.id}
                  openForm={openForm}
                  setOpenForm={setOpenForm}
                  hasVoted={hasVoted}
                  categoryList={categoryList}
                  categoryItem={categoryItem}
                  setCategoryItem={setCategoryItem}
                  categoryLength={categoryList?.length}
                  totalVotes={categoryItem?.total_votes}
                  mentorPerCategory={categoryItem?.total_votes_by_mentor}
                  isLoading = {isLoading}
                  setIsLoading={setIsLoading}
                />
              )
              :
              (
                <VotingCard
                  setCastVote={setCastVote}
                  categoryName={categoryItem?.name}
                  categoryID={categoryItem?.id}
                  handleVoteStatus={handleVoteStatus}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              )
            )
          )
        }
        {
          castVote &&
          (
            <VotingSuccessModal
              id={categoryItem?.id}
              setOpenForm={setOpenForm}
              setCastVote={setCastVote}
            />
          )
        }
      </Main>
    </>
  )
}

export default App
