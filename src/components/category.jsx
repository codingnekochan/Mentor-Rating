import ProfilePic from '../assets/profilePic.jpg'
import { BackButton, ForwardButton } from './buttons'
export default function Category({ children }) {
    return <div className="category-container min-w-[290px] w-[350px] h-[400px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] m-2 p-4 flex flex-col justify-around items-center text-white">
        {children}
    </div>
}

function CategoryCard() {
    return <>
        <CategoryName/>
        <div className="mentor-poll flex gap-3 justify-center items-end mb-4 shadow-inner shadow-[#162b2e40] p-2 md:p-4 rounded-md text-center">
            <MentorProfile  height='160px'/>
            <MentorProfile height='120px' />
            <MentorProfile height ='75px' />
            <MentorProfile height ='60px' />
            <MentorProfile height = '40px' />
        </div>
    </>
}
function MentorProfile({height}) {
    const style = {
        height:height
    }
    return (
        <div className="flex flex-col justify-center items-center gap-1">
            <span className='vote-count text-xs'>21%</span>
            <div className="mentor-vote w-4 bg-[rgba(29,223,244,0.5)] rounded-md" style={style}></div>
            <div className="mentor-profile w-10 h-10 rounded-full border border-[#1ddff440]">
                <img src={ProfilePic} alt="mentor-image" className="w-full h-full object-cover rounded-full" />
                <p className='mentor-name text-xs py-1'>John</p>
            </div>
        </div>)
}

function CategoryName(){
    return <div className="category-title border border-[#1ddff440] p-2 px-4 flex items-center gap-6 mb-2 rounded-3xl shadow shadow-[#1ddff440] mx-auto">
        <BackButton />
        <p>Most Influential</p>
        <ForwardButton />
    </div>
}
export {CategoryName, CategoryCard}