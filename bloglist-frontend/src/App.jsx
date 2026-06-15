import { useState, useEffect } from 'react'
import { Routes, Route, Link, useMatch} from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Footer from './components/Footer'

import Blog from './components/Blog'
import LoginForm from './components/loginForm'
import Notification from './components/Notification'
import BlogItem from './components/blogItem'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState({
    message: null,
    type: null,
  })

  /* LOAD USER */
  useEffect(() => {
    const loggedUserJSON =
      window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      setUser(user)

      blogService.setToken(user.token)
    }
  }, [])

  /* LOAD BLOGS */
  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort(
        (a, b) => b.likes - a.likes
      )

      setBlogs(sortedBlogs)
    })
  }, [])

  /* MATCH BLOG */
  const match = useMatch('/blogs/:id')

  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  /* NOTIFICATION */
  const notify = (
    message,
    type = 'success'
  ) => {
    setNotification({ message, type })

    setTimeout(() => {
      setNotification({
        message: null,
        type: null,
      })
    }, 5000)
  }

  /* LOGIN */
  const handleLogin = async e => {
    e.preventDefault()

    try {
      const userData =
        await loginService.login({
          username,
          password,
        })

      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(userData)
      )

      blogService.setToken(userData.token)

      setUser(userData)

      setUsername('')
      setPassword('')

      notify(`welcome ${userData.name}`)
    } catch (error) {
      notify(
        'wrong username or password',
        'error'
      )
    }
  }

  /* LOGOUT */
  const handleLogout = () => {
    window.localStorage.removeItem(
      'loggedBlogAppUser'
    )

    setUser(null)

    blogService.setToken(null)
  }

  /* CREATE BLOG */
  const createBlog = async blogObject => {
    try {
      const newBlog =
        await blogService.create(blogObject)

      setBlogs(
        blogs
          .concat(newBlog)
          .sort((a, b) => b.likes - a.likes)
      )

      notify(
        `a new blog ${newBlog.title} added`
      )
    } catch (error) {
      notify(
        'failed to create blog',
        'error'
      )
    }
  }

  /* LIKE BLOG */
  const handleLike = async blog => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1,
      }

      const returnedBlog =
        await blogService.update(
          blog.id,
          updatedBlog
        )

      setBlogs(
        blogs
          .map(blog =>
            blog.id === returnedBlog.id
              ? returnedBlog
              : blog
          )
          .sort((a, b) => b.likes - a.likes)
      )
    } catch (error) {
      notify(
        'failed to like blog',
        'error'
      )
    }
  }

  /* DELETE BLOG */
  const handleDelete = async blog => {
    const ok = window.confirm(
      `Remove blog "${blog.title}" by ${blog.author}?`
    )

    if (!ok) return

    try {
      await blogService.remove(blog.id)

      setBlogs(
        blogs.filter(
          b => b.id !== blog.id
        )
      )

      notify(`deleted "${blog.title}"`)
    } catch (error) {
      notify(
        'failed to delete blog',
        'error'
      )
    }
  }

  return (
    <div>


   
 
      {/* NAVIGATION */}
      <nav className="bg-blue-500 p-4 flex justify-between ">

    <Link to="/" className="text-white font-bold">
    BlogApp
  </Link>

       

        <Link to="/" className="text-white font-bold ml-auto pr-4">
          BLOGS
        </Link>

        <Link to="/users" className="text-white font-bold pr-4 ml-4">
          USERS
        </Link>

        {user && (
          <Link
            to="/create"
            className="text-white font-bold pr-4 ml-4"
          >
            NEW BLOG
          </Link>
        )}

        {user ? (
          <button onClick={handleLogout} className="text-white font-bold pr-4 ml-4">
            LOGOUT
          </button>
        ) : (
          <Link to="/login" className="text-white font-bold pr-4 ml-4" >
            LOGIN
          </Link>
        )}
        

      </nav>


      

      <Notification
        message={notification.message}
        type={notification.type}
      />

      <Routes>

        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <div className='max-w-5xl mx-auto mt-8 px-4'>

              <h2 className='bg-slate-900 w-full p-5 font-bold mt-8 text-slate-300'>Blogs</h2>

              <ul className='border border-gray-200 p-5'>
                {blogs.map(blog => (
                  <li key={blog.id} className=' py-2 list-disc text-blue-950 underline font-bold'>
                    <Link
                      to={`/blogs/${blog.id}`}
                    >
                      {blog.title} by{' '}
                      {blog.author}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>
          }
        />

        {/* CREATE PAGE */}
        <Route
          path="/create"
          element={
            <div>

              <h2 className="font-bold p-8 align-center flex justify-center bg-gray-300">create new</h2>

              <Blog
                createBlog={createBlog}
              />

            </div>
          }
        />

        {/* SINGLE BLOG */}
        <Route
          path="/blogs/:id"
          element={
            <BlogItem
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleDelete}
              user={user}
            />
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            <div>

              <h2 className="text-2xl font-bold mt-32 align-center flex justify-center">
                Log in to application
              </h2>

              <LoginForm
                username={username}
                password={password}
                handleLogin={handleLogin}
                setUsername={setUsername}
                setPassword={setPassword}
              />

            </div>
          }
        />

        {/* USERS */}
        <Route
          path="/users"
          element={<Users />}
        />

        {/* SINGLE USER */}
        <Route
          path="/users/:id"
          element={<User />}
        />

      </Routes>


<Footer />
    </div>
    
  )
  
}

export default App