import { CancelButton } from "./buttons";
import search from '../assets/search-icon.svg'
import { CategoryName } from "./category";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import Loader from "./loader";
//API Endpoints;
const fetchMentorsEndpoint = `https://rate-your-mentor.fly.dev/api/mentors`
const voteMentorEndpoint = `https://rate-your-mentor.fly.dev/api/votes`

// Voting Card Component
export default function VotingCard({ setCastVote, categoryName, categoryID, handleVoteStatus, isLoading, setIsLoading }) {
    //
    const [userInput, setUserInput] = useState('');
    const [mentorsList, setMentorList] = useState([])
    const [validationMessage, setValidationMesssage] = useState('')
    // update input value
    function handleUserInput(e) {
        setUserInput(e.target.value.trim())

        if (e.target.value.trim().length === 0) {
            setValidationMesssage('Enter a valid name')
        }
        else {
            setValidationMesssage('')
        }
    }

    function handleUserSelect(mentorID) {
        setCastVote(true)
        voteMentor(mentorID, categoryID)
        handleVoteStatus(categoryID)

    }
    //  run retrieveMentors function when there is change in userINput
    useEffect(() => {
        setIsLoading(true)
        let debounceFunction = setTimeout(() => {
            try {
                if (userInput && userInput.trim().length !== 0) {
                    fetchMentors(userInput)
                        .then(mentors => setMentorList(mentors))
                        .catch(error => console.error(error))
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                setIsLoading(false)
            }

        }, 1000);
        return () => clearTimeout(debounceFunction)
    }, [userInput])
    console.log(mentorsList)
    return <div className="voting-container min-w-[290px] w-[350px] h-[500px] md:w-[350px] lg:w-[400px] m-auto py-8 px-4 flex flex-col justify-center items-center text-white">
        <CategoryName categoryName={categoryName} />
        <div className="voting-card m-auto w-[70%]">
            <label htmlFor="mentor-search" className="relative">
                <input type="text" id='mentor-search' className="h-[35px] bg-[#ffffff0d] border border-[#d0a351] outline-none w-full rounded-lg px-4 py-1 placeholder:text-[#ffffff59] z-100" placeholder="Search for mentor" value={userInput} onChange={handleUserInput} />
                <img src={search} className="absolute top-0 right-2" alt="search icon" />
            </label>
            <div className="suggestion-container border-x border-b rounded-b-lg  border-[#d0a351] w-full h-[300px] p-4 relative bottom-2 overflow-auto -z-100">
                <ul className="suggestion-list flex flex-col justify-start gap-2 items-center text-left min-h-full">
                    {
                        isLoading ?
                            <Loader /> :
                            (validationMessage ? <p className="text-red-600 m-auto">{validationMessage}</p> :
                                (mentorsList.length !== 0 ? mentorsList?.map((mentor) => {
                                    return <li key={mentor.id} className="hover:cursor-pointer pb-2 w-full" onClick={() => handleUserSelect(mentor.id)}>
                                        {mentor.name}
                                    </li>
                                }) : <p>No Mentor Found</p>)
                            )
                    }
                </ul>
            </div>
        </div>
    </div>
}
//
export function VotingSuccessModal({ setCastVote, setOpenForm }) {
    return <div className="h-full w-full absolute top-0 flex justify-center items-center z-10 backdrop-blur-sm">
        <div className="success-modal min-w-[290px] w-[350px] md:w-[350px] lg:w-[400px] text-white relative mx-auto z-100 bg-black border border-[#d0a351] rounded-2xl flex flex-col">
            <p className="mb-10 mt-12 text-pretty text-center ">Voting Successful!!</p>
            <CancelButton setCastVote={setCastVote} setOpenForm={setOpenForm} />
        </div>
    </div>
}
//
VotingCard.propTypes = {
    setCastVote: PropTypes.func,
    categoryName: PropTypes.string,
    categoryID: PropTypes.number,
    handleVoteStatus: PropTypes.func,
    isLoading: PropTypes.bool,
    setIsLoading: PropTypes.func,
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
        const response = await fetch(fetchMentorsEndpoint);
        if (response.ok && response.status === 200) {
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
        const response = await fetch(voteMentorEndpoint, {
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