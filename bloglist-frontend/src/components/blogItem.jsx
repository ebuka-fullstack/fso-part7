import { useState } from 'react'
import { Link } from 'react-router-dom'

const BlogItem = ({
  blog,
  handleLike,
  handleDelete,
  user,
}) => {
  const [visible, setVisible] = useState(false)

  if (!blog) {
    return null
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const showRemoveButton =
    user &&
    blog.user &&
    user.username === blog.user.username

  return (
    <div
      style={{
        border: '1px solid #ccc',
        margin: '10px 0',
        padding: '10px',
      }}
    >

      {/* BLOG TITLE LINK */}
      <div className="blog-item">

        <Link to={`/blogs/${blog.id}`}>
          <strong>{blog.title}</strong> by {blog.author}
        </Link>

        <button onClick={toggleVisibility}
          className='px-8 py-2 ml-2 bg-gray-400 font-bold text-white rounded hover:bg-gray-500'
        >
          {visible ? 'hide' : 'show'}
        </button>

      </div>

      {/* BLOG DETAILS */}
      {visible && (
        <div
          className="blog-details"
          style={{ marginTop: '10px' }}
        >

          {/* URL */}
          <div className='text-blue-600'>
            <a
              href={
                blog.url?.startsWith('http')
                  ? blog.url
                  : `http://${blog.url}`
              }
              target="_blank"
              rel="noreferrer"
            >
              {blog.url}
            </a>
          </div>

          {/* USER */}
          <div className='text-gray-600'>
            Added by {blog.user?.name || 'unknown'}
          </div>

          {/* LIKES */}
          <div style={{ marginTop: '5px' }}>
            {blog.likes} likes 

            <button onClick={() => handleLike(blog)}
              className='px-8 py-2 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              like
            </button>

              {/* REMOVE BUTTON */}
          {showRemoveButton && (
            <button onClick={() => handleDelete(blog)}
              className='px-8 py-2 ml-2 bg-red-500 text-white rounded hover:bg-red-600'
            >
              remove
            </button>
          )}

          </div>

          

        
        </div>
      )}

    </div>
  )
}

export default BlogItem