import Forward from '../assets/arrow-forward.svg'
import Back from '../assets/arrow-back.svg'
import PropTypes from 'prop-types'
function CastVoteButton({ setCastVote, hasVoted }) {
    function toggleVoteForm() {
        setCastVote(true)
    }
    return <button id='cast-vote' className="border border-[#d0a351] px-4 py-1 rounded-xl shadow-xl mt-2" onClick={toggleVoteForm} disabled= {hasVoted}>
        {hasVoted ? 'Voted' : 'Cast your vote'}
    </button>
}
function ForwardButton({ categoryID, setCategoryID }) {
    function onForward() {
        setCategoryID(categoryID => categoryID + 1)
        localStorage.setItem('categoryID', categoryID + 1)
    }
    return <button className="forward-button" onClick={onForward}>
        <img src={Forward} alt="foward button" />
    </button>
}
function BackButton({ categoryID, setCategoryID }) {
    function onBackward() {
        if (categoryID > 1) {
            setCategoryID(categoryID => categoryID - 1)
            localStorage.setItem('categoryID', categoryID - 1)
        }
    }
    return <button className="back-button" disabled={categoryID === 1} onClick={onBackward}>
        <img src={Back} alt="back button" />
    </button>
}
function CancelButton({ setHasVoted,setCastVote,setVote }) {
    
    function goToCategory() {
        setCastVote(false)
        setVote(false)
        setHasVoted(true)
    }
    return <button id='vote' className="border border-[#d0a351] px-6 py-1 rounded-xl shadow-xl mx-auto mb-6" onClick={goToCategory} >
        <span>Back to categories</span>
    </button>
}


export { CastVoteButton, ForwardButton, BackButton, CancelButton }
CastVoteButton.propTypes = {
    setCastVote :PropTypes.func,
    hasVoted :PropTypes.bool
}
ForwardButton.propTypes = {
    categoryID :PropTypes.number,
    setCategoryID : PropTypes.func
}
BackButton.propTypes = {
    categoryID: PropTypes.number,
    setCategoryID: PropTypes.func
}
CancelButton.propTypes = {
    setHasVoted : PropTypes.func,
    setCastVote : PropTypes.func,
    setVote : PropTypes.func
}