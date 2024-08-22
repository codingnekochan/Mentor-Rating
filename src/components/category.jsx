import { useEffect } from 'react'
import ProfilePic from '../assets/profilePic.jpg'
import { BackButton, OpenFormButton, ForwardButton } from './buttons'
import { useState } from 'react'
import Loader from './loader'
import PropTypes from 'prop-types'

let ID = 1;
localStorage.setItem('categoryID', ID)
// 
export default function Category({ setOpenForm, hasVoted, category, setCategory, id, categoryLength, totalVotes, mentorPerCategory }) {

    return <div className="category-container min-w-[290px] w-[350px] h-[500px] md:w-[350px] lg:w-[400px] m-auto py-8 px-4 flex flex-col justify-center items-center text-white">
        <CategoryCard setOpenForm={setOpenForm} hasVoted={hasVoted} category={category} setCategory={setCategory} id={id} categoryLength={categoryLength} totalVotes={totalVotes} mentorPerCategory={mentorPerCategory} />
    </div>
}
// 
function CategoryCard({ setOpenForm, hasVoted, category, setCategory, id, categoryLength, totalVotes, mentorPerCategory }) {

    const [categoryID, setCategoryID] = useState(ID)
    const [isLoading, setIsLoading] = useState(false)

    let savedCategoryID = localStorage.getItem('categoryID')
    let numberofMentorsPerCategory = mentorPerCategory?.length

    async function getCategories(savedCategoryID) {
        setIsLoading(true)
        try {
            const response = await fetch(`https://rate-your-mentor.fly.dev/api/categories/${savedCategoryID}`)
            if (!response.ok) {
                throw new Error(`Response Status: ${response.status}`);
            }
            const fetchedCategory = await response.json()
            return setCategory(fetchedCategory)
        } catch (error) {
            console.error(error)
        }finally{
            setIsLoading(false)
        }
    }
// fetches categories every time user clicks forward or back button and changes categoryID
    useEffect(() => {
        getCategories(savedCategoryID)
    },[savedCategoryID])
//
    return <>
        {isLoading ?
            (<Loader/>):
            (<div className='w-[80%] h-full flex flex-col justify-between items-center'>
                <CategoryName categoryID={categoryID} setCategoryID={setCategoryID} categoryName={category.name} categoryLength={categoryLength} />
                <h1 className='mt-2 py-2 px-4 font-medium rounded-md  shadow-[#d0a4511f] relative top-1 shadow-inner'>Top 5 Mentors</h1>
                <div className="h-[300px] w-full mentor-poll flex gap-3 items-end mb-4 shadow-inner  shadow-[#d0a4511f] p-2 md:p-4 rounded-md text-center">
                    {
                        // checks that category list is not empty and renders mentors in categeory or cta message
                        numberofMentorsPerCategory > 0 ? (mentorPerCategory?.map((mentor) => {
                            let mentorVotePerCategory = ((mentor.total_votes / totalVotes) * 160)
                            console.log(mentorVotePerCategory)
                            return <MentorProfile key={mentor.mentor.id} height={`${mentorVotePerCategory}px`} mentorName={mentor.mentor.name} mentorVote={mentor.total_votes} mentorAvater={mentor.mentor.avater} />
                        }))
                            : (
                                <p className='w-full self-center text-center'>{`Vote your favourite mentor`}</p>
                            )
                    }
                </div>
                <OpenFormButton setOpenForm={setOpenForm} hasVoted={hasVoted} id={id} categoryID={categoryID} />

            </div>)
        }
    </>
}
//
function MentorProfile({ height, mentorName, mentorVote, mentorAvater }) {
    const style = {
        height: height
    }
    return (
        <div className="flex flex-col justify-center items-center gap-1">
            <span className='vote-count text-xs'>{mentorVote}</span>
            <div className="mentor-vote w-4 bg-[#c9782a] rounded-md" style={style}></div>
            <div className="mentor-profile w-10 h-10 rounded-full border-2 border-[#d0a351] mb-4">
                <img src={mentorAvater ? mentorAvater : ProfilePic} alt="mentor-image" className="w-full h-full object-cover rounded-full" />
                <p className='mentor-name text-xs py-1 h-[20px] w-[40%]'>{mentorName}</p>
            </div>
        </div>)
}
//
function CategoryName({ categoryID, setCategoryID, categoryName, categoryLength }) {
    return <div className="category-title w-[260px] border border-[#d0a351] p-2 px-4 flex items-center justify-between mb-2 rounded-3xl shadow shadow-[#d0a451a5] mx-auto">
        <BackButton categoryID={categoryID} setCategoryID={setCategoryID} />
        <p className='font-medium'>{categoryName}</p>
        <ForwardButton categoryID={categoryID} setCategoryID={setCategoryID} categoryLength={categoryLength} />
    </div>
}
//
export { CategoryName, CategoryCard }

Category.propTypes = {
    setOpenForm: PropTypes.func,
    hasVoted: PropTypes.object,
    category: PropTypes.object,
    setCategory: PropTypes.func,
    id: PropTypes.number,
    categoryLength: PropTypes.number,
    totalVotes: PropTypes.number,
    mentorPerCategory: PropTypes.array,
}
CategoryCard.propTypes = {
    id: PropTypes.number,
    setOpenForm: PropTypes.func,
    hasVoted: PropTypes.object,
    category: PropTypes.object,
    setCategory: PropTypes.func,
    categoryLength: PropTypes.number,
    totalVotes: PropTypes.number,
    mentorPerCategory: PropTypes.array,
}
MentorProfile.propTypes = {
    height: PropTypes.string,
    mentorName: PropTypes.string,
    mentorAvater: PropTypes.any,
    mentorVote: PropTypes.number,
}
CategoryName.propTypes = {
    categoryID: PropTypes.number,
    setCategoryID: PropTypes.func,
    categoryName: PropTypes.string,
    categoryLength: PropTypes.number,
}