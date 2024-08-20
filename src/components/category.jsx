import { useEffect } from 'react'
import ProfilePic from '../assets/profilePic.jpg'
import { BackButton, CastVoteButton, ForwardButton } from './buttons'
import { useState } from 'react'
import PropTypes from 'prop-types'

let ID = 1;
localStorage.setItem('categoryID', ID)

export default function Category({ setCastVote, hasVoted, category, setCategory }) {

    return <div className="category-container min-w-[290px] w-[350px] h-[400px] md:w-[350px] md:h-[400px] lg:w-[400px] lg:h-[400px] m-2 p-4 flex flex-col justify-around items-center text-white">
        <CategoryCard setCastVote={setCastVote} hasVoted={hasVoted} category={category} setCategory={setCategory} />
    </div>
}

function CategoryCard({ setCastVote, hasVoted, category, setCategory }) {
    const [categoryID, setCategoryID] = useState(ID)

    let savedCategoryID = localStorage.getItem('categoryID')

    async function getCategories(savedCategoryID) {
        const response = await fetch(`https://rate-your-mentor.fly.dev/api/categories/${savedCategoryID}`)
        const fetchedCategory = await response.json()
        console.log(fetchedCategory)
        return setCategory(fetchedCategory)
    }

    useEffect(() => {
        getCategories(savedCategoryID)
    }, [savedCategoryID])

    return <>
        <CategoryName categoryID={categoryID} setCategoryID={setCategoryID} categoryName={category.name} />
        <div className="mentor-poll flex gap-3 justify-center items-end mb-4 shadow-inner  shadow-[#d0a4511f] p-2 md:p-4 rounded-md text-center">
            <MentorProfile height='160px' />
            <MentorProfile height='120px' />
            <MentorProfile height='75px' />
            <MentorProfile height='60px' />
            <MentorProfile height='40px' />
        </div>
        <CastVoteButton setCastVote={setCastVote} hasVoted={hasVoted} />
    </>
}
function MentorProfile({ height }) {
    const style = {
        height: height
    }
    return (
        <div className="flex flex-col justify-center items-center gap-1">
            <span className='vote-count text-xs'>21%</span>
            <div className="mentor-vote w-4 bg-[#c9782a] rounded-md" style={style}></div>
            <div className="mentor-profile w-10 h-10 rounded-full border border-[#d0a351]">
                <img src={ProfilePic} alt="mentor-image" className="w-full h-full object-cover rounded-full" />
                <p className='mentor-name text-xs py-1'>John</p>
            </div>
        </div>)
}

function CategoryName({ categoryID, setCategoryID, categoryName }) {
    return <div className="category-title w-[260px] border border-[#d0a351] p-2 px-4 flex items-center justify-between mb-2 rounded-3xl shadow shadow-[#d0a451a5] mx-auto">
        <BackButton categoryID={categoryID} setCategoryID={setCategoryID} />
        <p>{categoryName}</p>
        <ForwardButton categoryID={categoryID} setCategoryID={setCategoryID} />
    </div>
}
export { CategoryName, CategoryCard }
Category.propTypes = {
    setCastVote: PropTypes.func,
    hasVoted: PropTypes.bool,
    category: PropTypes.object,
    setCategory: PropTypes.func

}
CategoryCard.propTypes = {
    setCastVote: PropTypes.func,
    hasVoted: PropTypes.bool,
    category: PropTypes.object,
    setCategory: PropTypes.func
}
MentorProfile.propTypes = {
    height: PropTypes.string
}
CategoryName.propTypes = {
    categoryID: PropTypes.number,
    setCategoryID: PropTypes.func,
    categoryName: PropTypes.string,
}