import React from 'react';
import { Typography, Card, CardContent, Button } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import models from '../../modelData/models';

const UserDetail = () => {
  const { userId } = useParams();
  const user = models.userModel(userId);

  if (!user) {
    return <Typography>Không tìm thấy người dùng</Typography>;
  }

  return (
    <Card style={{ margin: 20, maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {user.first_name} {user.last_name}
        </Typography>
        <Typography color="textSecondary">
          Địa điểm: {user.location || 'N/A'}
        </Typography>
        <Typography color="textSecondary">
          Nghề nghiệp: {user.occupation || 'N/A'}
        </Typography>
        <Typography color="textSecondary">
          Mô tả: {user.description || 'N/A'}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/photos/${user._id}`}
          style={{ marginTop: 10 }}
        >
          Xem ảnh
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserDetail;