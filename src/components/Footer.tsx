import { Link } from 'react-router-dom'
import GitHubLogo from '../assets/github.svg'
import LinkedInLogo from '../assets/linkedin.svg'

const Footer = () => {
  return (
    <footer className='absolute bottom-3 w-[15vw] flex justify-center items-center text-neutral-950 gap-3 '>
      <a href='https://github.com/LoicTramis/habit-builder-client' target='_blank' rel="noopener noreferrer" className="flex items-center gap-2 p-1 opacity-60 hover:opacity-100">
        <p className='text-sm font-bold'>GitHub</p>
        <img src={GitHubLogo} width={18} />
      </a>
      <p className='opacity-60'>&bull;</p>
      <a href='https://www.linkedin.com/in/loic-tramis-js-dev/' target='_blank' rel="noopener noreferrer" className="flex items-center gap-2 p-1 opacity-60 hover:opacity-100">
        <img src={LinkedInLogo} width={18} />
        <p className='text-sm font-bold text-[#0077B5]'>LinkedIn</p>
      </a>
    </footer >
  )
}

export default Footer