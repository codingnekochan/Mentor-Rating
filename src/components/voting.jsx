import { CancelButton } from "./buttons";
import search from '../assets/search-icon.svg'
import { CategoryName } from "./category";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types'

// Voting Card Component
export default function VotingCard({ setCastVote, categoryName, categoryID,handleVoteStatus}) {

    const [userInput, setUserInput] = useState('');
    const [mentorsList, setMentorList] = useState([])
    // update input value
    function handleUserInput(e) {
        setUserInput(e.target.value)
    }
    function handleUserSelect(mentorID) {
        setCastVote(true)
        voteMentor(mentorID, categoryID)
        handleVoteStatus(categoryID)

    }
    //  run retrieveMentors function when there is change in userINput
    useEffect(() => {
        let debounceFunction = setTimeout(() => {
            if (userInput) {
                fetchMentors(userInput)
                    .then(mentors => setMentorList(mentors))
                    .catch(error => console.error(error))
            }
        }, 1000);
        return () => clearTimeout(debounceFunction)
    }, [userInput])

    return <div className="voting-container min-w-[290px] w-[350px] h-[500px] md:w-[350px] lg:w-[400px] m-auto p-4 flex flex-col justify-around items-center text-white">
        <CategoryName categoryName={categoryName} />
        <div className="voting-card m-auto w-[70%]">
            <label htmlFor="mentor-search" className="relative">
                <input type="text" id='mentor-search' className="bg-[#ffffff0d] shadow-inner border border-[#d0a351] outline-none w-full rounded-lg px-4 py-1 placeholder:text-[#ffffff59]" placeholder="Search for mentor" value={userInput} onChange={handleUserInput} />
                <img src={search} className="absolute top-0 right-2" alt="search icon" />
            </label>
            <div className="suggestion-container border-x border-b rounded-b-lg  border-[#d0a351] w-full h-[300px] p-4 relative bottom-2 overflow-auto ">
                <ul className="suggestion-list">
                    {
                        mentorsList?.map((mentor) => {
                            return <li key={mentor.id} className="hover:cursor-pointer pb-2" onClick={() => handleUserSelect(mentor.id)}>
                                {mentor.name}
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    </div>
}
//
export function VotingSuccessModal({ setCastVote, setOpenForm}) {
    return <div className="h-full w-full absolute top-0 flex justify-center items-center z-10 backdrop-blur-sm">
        <div className="success-modal min-w-[290px] w-[350px] md:w-[350px] lg:w-[400px] text-white relative mx-auto z-100 bg-black border border-[#d0a351] rounded-2xl flex flex-col">
            <p className="mb-10 mt-12 text-pretty text-center ">Voting Successful!!</p>
            <CancelButton setCastVote={setCastVote} setOpenForm={setOpenForm}/>
        </div>
    </div>
}
//
VotingCard.propTypes = {
    setCastVote: PropTypes.func,
    categoryName: PropTypes.string,
    categoryID: PropTypes.number,
    handleVoteStatus: PropTypes.func,
}
VotingSuccessModal.propTypes = {
    setCastVote: PropTypes.func,
    setOpenForm: PropTypes.func,
}
//function to filter mentors based on user input 
function getInput(list, input) {
    let updatedList = [];
    list.forEach((item) => {
        if (item.name.toLowerCase().includes(input.toLowerCase())) {
            updatedList.push({
                id: item.id,
                name: item.name
            })
        }
    }
    )
    return updatedList;
}
// function to retrieve mentors and return an array based on userInput
async function fetchMentors(input) {
    try {
        const response = await fetch("https://rate-your-mentor.fly.dev/api/mentors");
        if (response.ok) {
            const mentors = await response.json();
            return getInput(mentors, input);
        }
    } catch (error) {
        console.log(error);
        console.log("not found");
    }
}

async function voteMentor(mentorID, categoryID) {
    let voteData = {
        'category_id': categoryID,
        'mentor_id': mentorID
    }
    try {
        const response = await fetch('https://rate-your-mentor.fly.dev/api/votes', {
            method: "POST",
            body: JSON.stringify(voteData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);

        }

    }
    catch (error) {
        console.error(error)
    }

}