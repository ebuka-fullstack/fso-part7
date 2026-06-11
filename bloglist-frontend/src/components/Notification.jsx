const Notification = ({ message, type }) => {
  if (!message) return null

  const style = {
    color: type === 'error' ? 'red' : 'green',
    fontSize: 17,
    borderStyle: 'solid',
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 10,
  }

  return <div style={style}>{message}</div>
}

export default Notification