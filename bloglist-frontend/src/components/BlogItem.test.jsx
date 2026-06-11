import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogItem from './BlogItem'
import Blog from './Blog'

test('renders title and author, but does not render url or likes by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'FullStackOpen',
    url: 'https://fullstackopen.com',
    likes: 5,
    user: {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
    },
  }

  render(
    <BlogItem
      blog={blog}
      handleLike={() => {}}
      handleDelete={() => {}}
      user={blog.user}
    />
  )

  expect(
    screen.getByText(
      'Component testing is done with react-testing-library'
    )
  ).toBeDefined()

  expect(
    screen.queryByText('https://fullstackopen.com')
  ).toBeNull()

  expect(
    screen.queryByText('5')
  ).toBeNull()
})

test('shows url and likes when the view button is clicked', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'FullStackOpen',
    url: 'https://fullstackopen.com',
    likes: 5,
    user: {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
    },
  }

  render(
    <BlogItem
      blog={blog}
      handleLike={() => {}}
      handleDelete={() => {}}
      user={blog.user}
    />
  )

  const user = userEvent.setup()

  const button = screen.getByText('view')
  await user.click(button)

  expect(
    screen.getByText('https://fullstackopen.com')
  ).toBeDefined()

  expect(
    screen.getByText('5')
  ).toBeDefined()
})

test('if the like button is clicked twice, the event handler is called twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'FullStackOpen',
    url: 'https://fullstackopen.com',
    likes: 5,
    user: {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
    },
  }

  const mockHandler = vi.fn()

  render(
    <BlogItem
      blog={blog}
      handleLike={mockHandler}
      handleDelete={() => {}}
      user={blog.user}
    />
  )

  const user = userEvent.setup()

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})




test('calls event handler with correct details when a new blog is created', async () => {
  const createBlog = vi.fn()

  const user = userEvent.setup()

  render(<Blog createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')

  await user.type(inputs[0], 'Testing React Forms')
  await user.type(inputs[1], 'FullStackOpen')
  await user.type(inputs[2], 'https://fullstackopen.com')

  const button = screen.getByText('create')

  await user.click(button)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Testing React Forms',
    author: 'FullStackOpen',
    url: 'https://fullstackopen.com',
  })
})