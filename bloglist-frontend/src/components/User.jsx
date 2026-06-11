
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import userService from '../services/users'

const User = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    userService.getById(id).then(user => setUser(user))
  }, [id])

  if (!user) return null

  return (
    <div>
      <h2 className='bg-gray-200 text-xl p-6'>{user.name}</h2>

      <h3 className='font-bold p-6 border-b-2 border-gray-300'>added blogs</h3>

      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id} className='p-2 border-b-2 border-gray-300'>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User