import { useNotificationDispatch } from "../NotificationContext"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const newNoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newObject) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newObject))
      dispatch({type: 'SET_NOTIF', payload: `anecdote ${newObject.content} added`})
      setTimeout(() => dispatch({type: 'CLEAR_NOTIF'}), (2000))
    },
    onError: (err) => { 
      dispatch({type: 'SET_NOTIF', payload: err.response.data.error})
      setTimeout(() => dispatch({type: 'CLEAR_NOTIF'}), (2000))
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate({ content, important: true })
    
    // try {
    //   newNoteMutation.mutate({ content, important: true })
    //   setNotification(`anecdote ${content} added`)
      
    // } catch (error) {
    //   setNotification(error)      
    // }
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
