import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Checkbox, FormControlLabel } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import models from '../../modelData/models';
const TopBar = () => {
  const location = useLocation();
  const [advancedFeatures, setAdvancedFeatures] = useState(false);

  let context = '';
  if (location.pathname.startsWith('/users/')) {
    const userId = location.pathname.split('/')[2];
    const user = models.userModel(userId);
    context = user ? `${user.first_name} ${user.last_name}` : 'Chi tiết người dùng';
  } else if (location.pathname.startsWith('/photos/')) {
    const userId = location.pathname.split('/')[2];
    const user = models.userModel(userId);
    context = user ? `Ảnh của ${user.first_name} ${user.last_name}` : 'Ảnh người dùng';
  } else if (location.pathname === '/users') {
    context = 'Tất cả người dùng';
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Tên Bạn
        </Typography>
        <Typography variant="h6" style={{ marginRight: 20 }}>
          {context}
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={advancedFeatures}
              onChange={(e) => setAdvancedFeatures(e.target.checked)}
              color="default"
            />
          }
          label="Bật tính năng nâng cao"
        />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

