import { useEffect } from 'react'
import ProfilePic from '../assets/profilePic.jpg'
import { BackButton, OpenFormButton, ForwardButton } from './buttons'
import { useState } from 'react'
import Loader from './loader'
import PropTypes from 'prop-types'
//
let index = 0;
localStorage.setItem('categoryID', index)
// 
export default function Category({ setOpenForm, hasVoted, categoryItem, setCategoryItem, categoryList, id, categoryLength, totalVotes, mentorPerCategory, isLoading, setIsLoading }) {

    return <div className="category-container min-w-[290px] w-[350px] h-[500px] md:w-[350px] lg:w-[400px] m-auto py-8 px-4 flex flex-col justify-center items-center text-white">
        <CategoryCard setOpenForm={setOpenForm} hasVoted={hasVoted} categoryItem={categoryItem} setCategoryItem={setCategoryItem} id={id} categoryList={categoryList} categoryLength={categoryLength} totalVotes={totalVotes} mentorPerCategory={mentorPerCategory} isLoading={isLoading} setIsLoading={setIsLoading} />
    </div>
}
// 
function CategoryCard({ setOpenForm, hasVoted, categoryItem, setCategoryItem, categoryLength, categoryList, id, totalVotes, mentorPerCategory, isLoading, setIsLoading }) {
    //
    const isNotEmpty = (categoryItem) => {
        return Object.keys(categoryItem).length !== 0 && categoryItem.constructor === Object;
    }
    const [categoryIndex, setCategoryIndex] = useState(index)
    const numberofMentorsPerCategory = mentorPerCategory?.length
    let savedCategoryIndex = localStorage.getItem('categoryID');
    let savedCategoryID = categoryList[savedCategoryIndex]?.id
    const fetchCategoryByIdEndpoint = `https://rate-your-mentor.fly.dev/api/categories/${savedCategoryID}`
    console.log(savedCategoryID)
    //
    async function getCategories() {
        setIsLoading(true)
        try {
            if (savedCategoryID) {
                const response = await fetch(fetchCategoryByIdEndpoint)
                if (!response.ok) {
                    throw new Error(`Response Status: ${response.status} && ${response.statusText}`);
                }
                else if (response.ok && response.status == 200) {
                    const fetchedCategory = await response.json()
                    console.log(fetchedCategory)
                    return setCategoryItem(fetchedCategory)
                }
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    // fetches categories every time user clicks forward or back button and changes categoryIndex
    useEffect(() => {
        getCategories()
    }, [savedCategoryID])
    //
    console.log(isNotEmpty(categoryItem))
    return <>
        {
            (
                isLoading ?
                    (<Loader />) :
                    ( isNotEmpty(categoryItem) === true && <div className='w-[80%] h-full flex flex-col justify-between items-center'>
                        <CategoryName categoryIndex={categoryIndex} setCategoryIndex={setCategoryIndex} categoryName={categoryItem?.name} categoryLength={categoryLength} />
                        <h1 className='mt-2 py-2 px-4 font-medium rounded-md  shadow-[#d0a4511f] relative top-1 shadow-inner'>Top 5 Mentors</h1>
                        <div className="h-[300px] w-full mentor-poll flex gap-3 items-end mb-4 shadow-inner  shadow-[#d0a4511f] p-2 md:p-4 rounded-md text-center">
                            {
                                // checks that category list is not empty and renders mentors in categeory or cta message
                                numberofMentorsPerCategory > 0 ? (mentorPerCategory?.map((mentor) => {
                                    let mentorVotePerCategory = ((mentor?.total_votes / totalVotes) * 160)
                                    console.log(mentorVotePerCategory)
                                    return <MentorProfile key={mentor?.mentor.id} height={`${mentorVotePerCategory}px`} mentorName={mentor?.mentor.name} mentorVote={mentor?.total_votes} mentorAvater={mentor?.mentor.avater} />
                                }))
                                    : (
                                        <p className='w-full self-center text-center'>{`Vote your favourite mentor`}</p>
                                    )
                            }
                        </div>
                        <OpenFormButton setOpenForm={setOpenForm} hasVoted={hasVoted} id={id} />

                    </div>)
            )
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
function CategoryName({ categoryIndex, setCategoryIndex, categoryName, categoryLength }) {
    return <div className="category-title w-[260px] border border-[#d0a351] p-2 px-4 flex items-center justify-between mb-2 rounded-3xl shadow shadow-[#d0a451a5] mx-auto">
        <BackButton categoryIndex={categoryIndex} setCategoryIndex={setCategoryIndex} />
        <p className='font-medium'>{categoryName}</p>
        <ForwardButton categoryIndex={categoryIndex} setCategoryIndex={setCategoryIndex} categoryLength={categoryLength} />
    </div>
}
//
export { CategoryName, CategoryCard }

Category.propTypes = {
    setOpenForm: PropTypes.func,
    hasVoted: PropTypes.object,
    categoryItem: PropTypes.object,
    setCategoryItem: PropTypes.func,
    categoryList: PropTypes.array,
    id: PropTypes.number,
    categoryLength: PropTypes.number,
    totalVotes: PropTypes.number,
    mentorPerCategory: PropTypes.array,
    isLoading: PropTypes.bool,
    setIsLoading: PropTypes.func,
}
CategoryCard.propTypes = {
    id: PropTypes.number,
    setOpenForm: PropTypes.func,
    hasVoted: PropTypes.object,
    categoryItem: PropTypes.object,
    setCategoryItem: PropTypes.func,
    categoryList: PropTypes.array,
    categoryLength: PropTypes.number,
    totalVotes: PropTypes.number,
    mentorPerCategory: PropTypes.array,
    isLoading: PropTypes.bool,
    setIsLoading: PropTypes.func,
}
MentorProfile.propTypes = {
    height: PropTypes.string,
    mentorName: PropTypes.string,
    mentorAvater: PropTypes.any,
    mentorVote: PropTypes.number,
}
CategoryName.propTypes = {
    categoryIndex: PropTypes.number,
    setCategoryIndex: PropTypes.func,
    categoryName: PropTypes.string,
    categoryLength: PropTypes.number,
}