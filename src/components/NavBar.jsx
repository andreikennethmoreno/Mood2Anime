export default function NavBar({ onBackClick, selectedMood}) {
    return (
        <>
          

           <div className="navbar bg-slate-100/5 py-2 my-5 rounded-[15px] center-container shadow-xl">
                <div className="navbar-start">
                {/* --start default contenrt  */}
                    <button  onClick={onBackClick} className="btn btn-ghost  text-3xl btn-circle">
                      ⛩️
                    </button>

                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost text-xl">
                       {selectedMood ? selectedMood : "Mood2Anime"}
                    </a>
                </div>
                <div className="navbar-end">
                    {/* --end default contenrt  */}
                    <button onClick={onBackClick} className="btn btn-ghost  text-3xl btn-circle">
                        <svg height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" fill="#ffffff"></path> </g></svg>
                    </button>
                    
                </div>
            </div>



        </>
    )
}