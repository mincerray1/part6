import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {        
        const filtered = state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
        const sorter = function (a, b){
            return b.votes - a.votes
        }
        return [...filtered].sort(sorter)
        // return state.anecdotes
    })
    console.log('anecdotes', anecdotes)

    const dispatch = useDispatch()

    const vote = (id, object) => {
      dispatch(addVote(id, object))
      dispatch(setNotification(`you voted '${object.content}'`, 2))
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
                </div>
                </div>
            )}
        </>
    )
}
  
export default AnecdoteList