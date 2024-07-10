const Main = ({ title, children }) => {
  return (
    <main className='w-5/6'>
      <h1>{title}</h1>
      {children}
    </main>
  )
}

export default Main