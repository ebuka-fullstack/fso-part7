const loginForm = ({username,password,handleLogin,setUsername,setPassword}) => (
  <form onSubmit={handleLogin}>
    <div className="flex items-center justify-center gap-2 mt-8">
      <label htmlFor="username" className="block mb-1 font-medium mt-4">username:</label>
      <input
        type="text"
        id="username"
        data-testid="username"
        className="w-1/2 border border-gray-300  rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div className="flex items-center justify-center gap-2 mt-6">
      <label htmlFor="password" className="block mb-1 font-medium">password:</label>
      <input
        type="password"
        id="password"
        data-testid="password"
        className="w-1/2 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <div className="flex items-center justify-center gap-2 mt-6">
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/3">
      Login
    </button>
    </div>
  </form>
)





export default loginForm