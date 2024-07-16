const Main = ({ title, children }) => {
  return (
    <main className='w-5/6 h-full overflow-y-scroll overflow-x-hidden shadow-2xl rounded-3xl border-l  border-[#c7c7c7] bg-neutral-100 text-neutral-950 py-11 px-12'>
      <h1 className="mb-6 font-bold">{title}</h1>
      {children}
    </main>
  )
}

export default Main