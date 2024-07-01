
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote, getAnecdotes } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const Anecdotes = () => {
    const queryClient = useQueryClient()
    const voteAnecdoteMutation = useMutation({
      mutationFn: updateAnecdote,
      onSuccess: (updatedAnecdote) => {
        const anecdotes = queryClient.getQueryData(['anecdotes'])
        console.log('updatedAnecdote', updatedAnecdote)
        const newAnecdotes = anecdotes.map(anecdote=>
          anecdote.id === updatedAnecdote.id
          ? {...anecdote, votes: anecdote.votes + 1}
          : {...anecdote}
        )
        queryClient.setQueryData(['anecdotes'], newAnecdotes)
      },
    })

    const result = useQuery({
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      refetchOnWindowFocus: false,
      retry: 1
    })
    console.log(JSON.parse(JSON.stringify(result)))
    const dispatch = useNotificationDispatch()

    const handleVote = (anecdote) => {
        console.log('vote')
        voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
        dispatch({type: 'SET_NOTIF', payload: `anecdote ${anecdote.content} voted`})
        setTimeout(() => dispatch({type: 'CLEAR_NOTIF'}), (2000))
    }
  
    if ( result.isError ) {
      return <div>anecdote service not available due to problems in the server</div>
    }
    if ( result.isLoading ) {
      return <div>loading data...</div>
    }
    const anecdotes = result.data
    return (
        <>        
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}

export default Anecdotes