import { VoteButton } from "./buttons";
import search from '../assets/search-icon.svg'
import closeButton from '../assets/close.svg'
import { CategoryName } from "./category";

export default function VotingCard() {
    return <div className="voting-container min-w-[290px] w-[350px] h-[400px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] m-2 p-4 flex flex-col text-white">
        <CategoryName />
        <div className="voting-card m-auto w-[70%]">
            <label htmlFor="mentor-search" className="relative">
                <input type="search" className="bg-[#ffffff0d] shadow-inner border border-[#1ddff440] outline-none w-full rounded-lg px-4 py-1 placeholder:text-[#ffffff59] z-100" placeholder="Search for mentor" />
                <img src={search} className="absolute top-0 right-2" alt="search icon" />
            </label>
            <div className="suggestion-container border-x border-b rounded-b-lg  border-[#1ddff440] w-full h-[200px] p-4 relative bottom-2 -z-50">
                <ul className="suggestion-list">
                    <li className="suggestion-item">Suggestion</li>
                    <li className="suggestion-item">Suggestion</li>
                    <li className="suggestion-item">Suggestion</li>
                    <li className="suggestion-item">Suggestion</li>
                </ul>
            </div>
        </div>
        <VoteButton />
    </div>
}

export function VotingSuccessModal() {
    return <div className="success-modal min-w-[290px] w-[350px] md:w-[350px] lg:w-[400px] text-white relative">
        <img src={closeButton} className="absolute top-4 right-4" alt="" />
        <p className="mb-10 mt-12 text-pretty text-center ">Voting Successful!!</p>
    </div>
}