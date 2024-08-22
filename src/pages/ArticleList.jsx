import React from 'react'

// page
import ArticleContent from './ArticleContent'
// component
import Articles from '../components/Articles'

const ArticleList = () => {
  return (
    <div className='mb-20'>
      <h1 className='sm:text-4xl text-2xl font-bold my-6 text-gray-900'>
        Article List
      </h1>
      <div className='container py-4 mx-auto'>
        <div className='flex flex-wrap -m-4'>
          <Articles articels={ArticleContent} />
        </div>
      </div>
    </div>
  )
}

export default ArticleList