import { Checkbox, Chip, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

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
                    <DeleteForeverOutlinedIcon/>
                  </IconButton>
                } >
                  <ListItemButton role={undefined} onClick={(e) => handleCompleteToggle(e, i.id) } dense>
                    <ListItemIcon>
                      <Checkbox
                        edge={'start'} 
                        checked={i.completed_at !== null}  
                      />
                      <ListItemText style={{fontSize: '20px'}} id={labelId} primary={i.title} />
                      <Chip label={i.completed_at === null ? 'In Progress' : 'Completed'} 
                        color={i.completed_at === null ? 'warning' : 'success'}
                      />
                      
                     
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