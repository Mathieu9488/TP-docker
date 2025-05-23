import { useState, useEffect } from 'react'
import './App.css'

// Use environment variable or fallback to default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/todos`)
      if (!response.ok) {
        throw new Error('Failed to fetch todos')
      }
      const data = await response.json()
      setTodos(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching todos:', err)
      setError('Failed to load tasks. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async () => {
    if (newTodo.trim() === '') return

    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTodo }),
      })

      if (!response.ok) {
        throw new Error('Failed to add todo')
      }

      const addedTodo = await response.json()
      setTodos([addedTodo, ...todos])
      setNewTodo('')
    } catch (err) {
      console.error('Error adding todo:', err)
      setError('Failed to add task. Please try again.')
    }
  }

  const toggleTodo = async (id, completed) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      })

      if (!response.ok) {
        throw new Error('Failed to update todo')
      }

      const updatedTodo = await response.json()
      setTodos(todos.map(todo => 
        todo._id === id ? updatedTodo : todo
      ))
    } catch (err) {
      console.error('Error updating todo:', err)
      setError('Failed to update task. Please try again.')
    }
  }

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete todo')
      }

      setTodos(todos.filter(todo => todo._id !== id))
    } catch (err) {
      console.error('Error deleting todo:', err)
      setError('Failed to delete task. Please try again.')
    }
  }

  // Remplacé onKeyPress par onKeyDown (recommandé)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  }

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          onKeyDown={handleKeyDown}  // Remplacé par onKeyDown
        />
        <button onClick={addTodo}>Add</button>
      </div>
      
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul className="todo-list">
          {todos.length === 0 ? (
            <p>No tasks yet. Add some!</p>
          ) : (
            todos.map((todo) => (
              <li key={todo._id} className={todo.completed ? 'completed' : ''}>
                <span onClick={() => toggleTodo(todo._id, todo.completed)}>
                  {todo.text}
                </span>
                <button onClick={() => deleteTodo(todo._id)}>Delete</button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}

export default App