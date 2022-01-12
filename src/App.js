import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch'
import Follower from './Follower'
function App() {
  const { loading, data } = useFetch()

  const [followers, setFollowers] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    if (loading) return
    setFollowers(data[page])
  }, [loading, page])

  // const nextPage = (page) => {
  //   setPage(page + 1)
  //   if (page > data.length - 2) {
  //     setPage(0)
  //     return page
  //   }
  //   return page
  // }

  const nextPage = () => {
    setPage((oldPage) => {
      let newPage = oldPage + 1
      if (newPage > data.length - 1) {
        newPage = 0
      }
      return newPage
    })
  }

  const prevPage = () => {
    setPage((oldPage) => {
      let newPage = oldPage - 1
      if (newPage < 0) {
        newPage = data.length - 1
      }
      return newPage
    })
  }

  const handlePage = (index) => {
    setPage(index)
  }
  // const prevPage = (page) => {
  //   setPage(page - 1)
  //   if (page <= 0) {
  //     setPage(data.length - 1)
  //     return page
  //   }
  //   return page
  // }

  return (
    <main>
      <div className='section-title'>
        <h1>{loading ? '...loading' : 'pagination'}</h1>
        <div className='underline'></div>
      </div>
      <section className='followers'>
        <div className='container'>
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />
          })}
        </div>
        {!loading && (
          <div className='btn-container'>
            <button className='prev-btn' onClick={prevPage}>
              prev
            </button>
            {data.map((item, index) => {
              return (
                <button
                  className={`${
                    page == index ? 'page-btn active-btn ' : 'page-btn '
                  }`}
                  onClick={() => handlePage(index)}
                  key={index}
                >
                  {index + 1}
                </button>
              )
            })}

            <button className='next-btn' onClick={nextPage}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
