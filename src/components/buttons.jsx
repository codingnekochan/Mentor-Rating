import Forward from '../assets/arrow-forward.svg'
import Back from '../assets/arrow-back.svg'
import PropTypes from 'prop-types'
// 
function OpenFormButton({ setOpenForm,hasVoted,id}) {

    const voteIsTrue = !!hasVoted[id]
    function openVoteForm() {
        setOpenForm(true)
    }
    return <button id='cast-vote' className="border border-[#d0a351] px-4 py-1 rounded-xl shadow-xl mt-2" onClick={openVoteForm} disabled={voteIsTrue}>
       {voteIsTrue? 'Voted' : 'Cast your vote'}
    </button>
}
//
function ForwardButton({ categoryID, setCategoryID, categoryLength }) {
    function onForward() {
        setCategoryID(categoryID => categoryID + 1)
        localStorage.setItem('categoryID', categoryID + 1)
    }
    return <button className="forward-button" disabled={categoryID === categoryLength} onClick={onForward}>
        <img src={Forward} alt="foward button" />
    </button>
}
// 
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
// 
function CancelButton({setOpenForm, setCastVote}) {

    function goToCategory() {
        setOpenForm(false)
        setCastVote(false)
    }
    return <button id='vote' className="border border-[#d0a351] px-6 py-1 rounded-xl shadow-xl mx-auto mb-6" onClick={goToCategory} >
        <span>Back to categories</span>
    </button>
}

export { OpenFormButton, ForwardButton, BackButton, CancelButton }

OpenFormButton.propTypes = {
    setOpenForm: PropTypes.func,
    hasVoted: PropTypes.object,
    id :PropTypes.number
}
ForwardButton.propTypes = {
    categoryID: PropTypes.number,
    setCategoryID: PropTypes.func,
    categoryLength : PropTypes.number
}
BackButton.propTypes = {
    categoryID: PropTypes.number,
    setCategoryID: PropTypes.func
}
CancelButton.propTypes = {
    handleVoteStatus: PropTypes.func,
    id: PropTypes.number,
    setOpenForm: PropTypes.func,
    setCastVote: PropTypes.func
}