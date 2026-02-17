
function App() {

  return (
    <>
    <div className="navbar bg-base-200 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">❤️ Dev Tinder - PairUp 💕</a>
</div>
  <div className="flex gap-2">
    
    <div className="dropdown dropdown-end mx-5">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full ">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://c.saavncdn.com/346/Giga-Chad-English-2022-20230623063017-500x500.jpg" />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge"></span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
    </div> 

   <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  </>
  )
}

export default App
