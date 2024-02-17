import { Button, FormControl, TextField } from '@mui/material'
import React from 'react'

const TodoCreator = ({todo, setTodo, handleSubmit}) => {
  return (
    <>
      <FormControl style={{width: '50%'}}>
        <TextField
          value={todo || ''} 
          onChange={(e) => setTodo(e.target.value)}
          size='large' 
          id="add-todo" 
          label="Add to do item" 
          variant="outlined" />
      </FormControl>
      <Button 
        disabled={!todo}
        onClick={(e) => handleSubmit(e)}
        variant='contained' 
        size='large' 
        style={{height: '58px'}} 
        type='submit'
      >Add
      </Button>
    </>
  )
}

export default TodoCreator