import Forward from '../assets/arrow-forward.svg'
import Back from '../assets/arrow-back.svg'
function CastVoteButton() {
    return <button id='cast-vote' className="border border-[#1ddff440] px-4 py-1 rounded-xl shadow-xl mt-2">
        Cast your vote
    </button>
}
function VoteButton() {
    return <button id='vote' className="border border-[#1ddff440] px-6 py-1 rounded-xl shadow-xl m-auto">
        Vote
    </button>
}
function ForwardButton() {
    return <button className="forward-button">
        <img src={Forward} alt="foward button" />
    </button>
}
function BackButton() {
    return <button className="back-button">
        <img src={Back} alt="back button"/>
    </button>
}


export { CastVoteButton,VoteButton, ForwardButton, BackButton }