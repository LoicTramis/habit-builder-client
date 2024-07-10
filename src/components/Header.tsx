import { Link } from "react-router-dom"
import HomeIcon from "../assets/HomeIcon.svg"

const Header = () => {
  return (
    <header className="p-3">
      <Link to={'/'} className="flex flex-col text-center">
        <img src={HomeIcon} alt="Home Icon" width={60} className="mx-auto" />
        <h1 className="font-titanone gradient">
          HABIT BUILDER
        </h1>
      </Link>
    </header>
  )
}

export default Header