import { CancelButton } from "./buttons";
import search from '../assets/search-icon.svg'
import { CategoryName } from "./category";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types'

// Voting Card Component
export default function VotingCard({setVote, categoryName, categoryID }) {

    const [userInput, setUserInput] = useState('');
    const [mentorsList, setMentorList] = useState([])
    // update input value
    function handleUserInput(e) {
        setUserInput(e.target.value)
    }
    function handleUserSelect(mentorID){
        setVote(true)
        voteMentor(mentorID,categoryID)
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

    return <div className="voting-container min-w-[290px] w-[350px] h-[400px] md:w-[350px] md:h-[400px] lg:w-[400px] lg:h-[400px] m-2 px-4 pb-4 pt-5 flex flex-col text-white">
        <CategoryName categoryName={categoryName} />
        <div className="voting-card m-auto w-[70%]">
            <label htmlFor="mentor-search" className="relative">
                <input type="text" id='mentor-search' className="bg-[#ffffff0d] shadow-inner border border-[#d0a351] outline-none w-full rounded-lg px-4 py-1 placeholder:text-[#ffffff59]" placeholder="Search for mentor" value={userInput} onChange={handleUserInput} />
                <img src={search} className="absolute top-0 right-2" alt="search icon" />
            </label>
            <div className="suggestion-container border-x border-b rounded-b-lg  border-[#d0a351] w-full h-[250px] p-4 relative bottom-2 overflow-auto ">
                <ul className="suggestion-list">
                    {
                        mentorsList && mentorsList.map((mentor) => {
                            return <li key={mentor.id} className="hover:cursor-pointer" onClick={()=>handleUserSelect(mentor.id)}>
                                {mentor.name}
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    </div>
}

export function VotingSuccessModal({ setVote, setCastVote, setHasVoted }) {
    return <div className="h-full w-full absolute top-0 flex justify-center items-center z-10 backdrop-blur-sm">
        <div className="success-modal min-w-[290px] w-[350px] md:w-[350px] lg:w-[400px] text-white relative mx-auto z-100 bg-black border border-[#d0a351] rounded-2xl flex flex-col">
            <p className="mb-10 mt-12 text-pretty text-center ">Voting Successful!!</p>
            <CancelButton setVote={setVote} setCastVote={setCastVote}  setHasVoted={setHasVoted}/>
        </div>
    </div>
}
VotingCard.propTypes = {
    setVote: PropTypes.func,
    categoryName: PropTypes.string,
    categoryID :PropTypes.number,
}
VotingSuccessModal.propTypes = {
    setVote : PropTypes.func,
    setHasVoted :PropTypes.func,
    setCastVote: PropTypes.func
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
        console.log(response.status)
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
    console.log(voteData)
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
        console.log(response)

    }
    catch (error) {
        console.error(error)
    }

}