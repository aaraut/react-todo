import { Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react';

const TodoList = ({todoList, handleCompleteToggle, handleDeleteItem}) => {
  return (
    <>
      <List>
        {
          todoList.length >=1 ?todoList.map(i => {
            const labelId = `checkbox-label-${i.id}`;

            return (
                <ListItem key={i.id}
                  secondaryAction={
                  <IconButton className='remove-btn' edge="end" onClick={(e) => handleDeleteItem(e, i.id)} title='Remove Item'>
                    x
                  </IconButton>
                } >
                  <ListItemButton role={undefined} onClick={(e) => handleCompleteToggle(e, i.id) } dense>
                    <ListItemIcon>
                      <Checkbox
                        edge={'start'} 
                        checked={i.completed_at !== null}  
                      />
                      <ListItemText style={{fontSize: '20px'}} id={labelId} primary={i.title} />
                    </ListItemIcon>
                  </ListItemButton>
                  
                </ListItem>
              )
          }) : 
          <ListItem>
             <ListItemText style={{fontSize: '20px', textAlign: 'center'}}  primary={`PLEASE ADD TO DO ITEMS`} />
          </ListItem>

          
        }
      </List>
    </>
  )
}

export default TodoList