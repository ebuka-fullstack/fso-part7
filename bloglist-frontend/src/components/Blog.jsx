import {useState} from 'react'

const Blog = ({ createBlog }) => {

const [title, setTitle] = useState('')
const [author, setAuthor] = useState('')
const [url, setUrl] = useState('')


const handleSubmit = (e) => {
  e.preventDefault()
  const newBlog = { title, author, url}
  createBlog(newBlog)
  setTitle('')
  setAuthor('')
  setUrl('')
}
  
return (
<form onSubmit={handleSubmit}>
  <div className="flex text-items-center justify-center gap-2 mt-6">
    Title:
    <input
      type="text"
      value={title}
      name="Title"
      onChange={({ target }) => setTitle(target.value)}
      className="w-1/2 border border-gray-300  rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter blog title..."
    />
  </div>
  <div className="flex text-items-center justify-center gap-2 mt-4">
    Author:
    <input
      type="text"
      value={author}
      name="Author"
      onChange={({ target }) => setAuthor(target.value)}
      placeholder="Enter blog author..."
      className="w-1/2 border border-gray-300  rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
   
    />
  </div>
  <div className="flex text-items-center justify-center gap-2 mt-4">
    URL:
    <input
      type="text"
      value={url}
      name="Url"
      onChange={({ target }) => setUrl(target.value)}
      placeholder="Enter blog url..."
      className="w-1/2 border border-gray-300  rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <div className="flex items-center justify-center">
  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/3 mt-6">
    create
  </button>
  </div>
</form>
)
}
export default Blog