import React, { useState } from 'react';
import { Avatar, Box, Typography, IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';

export default function Post({ post, authorName, profile }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);

  const createdAt = post.createdAt ? new Date(post.createdAt) : null;
  const relativeTime = createdAt
    ? formatDistanceToNow(createdAt, { addSuffix: true })
    : '';
  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: 2,
        boxShadow: 3,
        margin: '30px 0',
        padding: 2,
        backgroundColor: 'white',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt={post.author}
            src={profile.profilePicture || post.authorImage}
            sx={{ width: 32, height: 32, marginRight: 2 }}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {profile.firstname && profile.lastname
                ? profile.firstname + ' ' + profile.lastname
                : 'Unknown Author'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {relativeTime}
            </Typography>
          </Box>
        </Box>
        <IconButton>
          <MoreVert />
        </IconButton>
      </Box>

      <Box sx={{ margin: '20px 0' }}>
        <Typography variant="body1">{post.title}</Typography>
        <img
          src={post.image}
          alt="Post"
          style={{
            width: '100%',
            maxWidth: '600px',
            maxHeight: '300px',
            objectFit: 'cover',
            borderRadius: '10px',
            marginTop: '10px',
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={likeHandler}>
            <img
              src="assets/like.png"
              alt="Like"
              style={{
                width: '24px',
                height: '24px',
                marginRight: '5px',
                cursor: 'pointer',
              }}
            />
          </IconButton>
          <IconButton onClick={likeHandler}>
            <img
              src="assets/heart.png"
              alt="Heart"
              style={{
                width: '24px',
                height: '24px',
                marginRight: '5px',
                cursor: 'pointer',
              }}
            />
          </IconButton>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {like} people like it
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            cursor: 'pointer',
            borderBottom: '1px dashed gray',
          }}
        >
          {post.comments} comments
        </Typography>
      </Box>
    </Box>
  );
}
