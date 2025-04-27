import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import models from '../../modelData/models';
import './styles.css';

const UserPhotos = () => {
  const { userId } = useParams();
  const location = useLocation();
  const history = useHistory();
  const photos = models.photoOfUserModel(userId);
  const user = models.userModel(userId);
  const [advancedFeatures] = useState(location.state?.advancedFeatures || false);

  const query = new URLSearchParams(location.search);
  const initialPhotoId = query.get('photoId');
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(
    initialPhotoId
      ? photos.findIndex((photo) => photo._id === initialPhotoId)
      : 0
  );

  useEffect(() => {
    if (advancedFeatures && photos[currentPhotoIndex]) {
      history.replace(`/photos/${userId}?photoId=${photos[currentPhotoIndex]._id}`);
    }
  }, [currentPhotoIndex, advancedFeatures, history, photos, userId]);

  if (!user || !photos || photos.length === 0) {
    return <Typography>Không tìm thấy ảnh cho người dùng này</Typography>;
  }

  const handleNext = () => {
    if (currentPhotoIndex < photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const renderPhoto = (photo) => (
    <Card key={photo._id} className="card">
      <CardContent>
        <img
          src={`/images/${photo.file_name}`}
          alt="Ảnh người dùng"
          className="photo"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300?text=${photo.file_name}`;
          }}
        />
        <Typography color="textSecondary">
          Tạo lúc: {new Date(photo.date_time).toLocaleString()}
        </Typography>
        {photo.comments && photo.comments.length > 0 && (
          <>
            <Typography variant="h6">Bình luận:</Typography>
            {photo.comments.map((comment) => {
              const commentUser = models.userModel(comment.user._id);
              return (
                <div key={comment._id} className="comment">
                  <Typography color="textSecondary">
                    {new Date(comment.date_time).toLocaleString()} bởi{' '}
                    <Link to={`/users/${comment.user._id}`}>
                      {commentUser.first_name} {commentUser.last_name}
                    </Link>
                  </Typography>
                  <Typography>{comment.comment}</Typography>
                </div>
              );
            })}
          </>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div style={{ padding: 20 }}>
      {advancedFeatures ? (
        <>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Button
                variant="contained"
                onClick={handlePrev}
                disabled={currentPhotoIndex === 0}
              >
                Trước
              </Button>
            </Grid>
            <Grid item>
              <Typography>
                Ảnh {currentPhotoIndex + 1} / {photos.length}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={currentPhotoIndex === photos.length - 1}
              >
                Tiếp
              </Button>
            </Grid>
          </Grid>
          {photos[currentPhotoIndex] && renderPhoto(photos[currentPhotoIndex])}
        </>
      ) : (
        photos.map((photo) => renderPhoto(photo))
      )}
    </div>
  );
};

export default UserPhotos;