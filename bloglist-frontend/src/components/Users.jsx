import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(users => setUsers(users))
  }, [])

  return (
    <div className="mt-8">
      <h2 className="mb-6 text-4xl font-semibold text-gray-800">
        Users
      </h2>

      <div className="overflow-hidden rounded-sm bg-white shadow-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b-gray-300 text-left">
              <th className="px-6 py-4 font-bold text-gray-700">
                Name
              </th>

              <th className="px-6 py-4 font-bold text-gray-700">
                Username
              </th>

              <th className="px-6 py-4 font-bold text-gray-700">
                Blogs created
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr
                key={user.id}
                className="border-b-gray-300 hover:bg-gray-50"
              >
                <td className="px-6 py-5">
                  <Link
                    to={`/users/${user.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {user.name}
                  </Link>
                </td>

                <td className="px-6 py-5 text-gray-700">
                  {user.username}
                </td>

                <td className="px-6 py-5 text-gray-700">
                  {user.blogs.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Users