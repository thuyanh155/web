import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import models from '../../modelData/models';

const UserList = () => {
  const users = models.userListModel();

  return (
    <List component="nav">
      {users.map((user) => (
        <ListItem
          button
          component={Link}
          to={`/users/${user._id}`}
          key={user._id}
        >
          <ListItemText primary={`${user.first_name} ${user.last_name}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;