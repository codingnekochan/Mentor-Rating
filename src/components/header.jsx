import rating from '/mentor-rating.svg'
export default function Header() {
   return <>
      <header className="px-3 py-6 md:px-4 flex gap-3 items-center">
         <h1 className=" text-2xl md:text-4xl text-white font-['Edu_VIC_WA_NT_Beginner'] font-bold">Mentor Ratings</h1>
         <img src={rating} alt='rating icon'/>
      </header>
      <div className="h-[1px] w-full bg-[#d0a351] shadow-xl"></div>
   </>
}