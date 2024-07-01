import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Anecdotes from './components/Anecdotes'
import { NotificationContextProvider } from './NotificationContext'

const App = () => {
  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

  return (
    <NotificationContextProvider>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
      <Anecdotes />
    </NotificationContextProvider>
  )
}

export default App
