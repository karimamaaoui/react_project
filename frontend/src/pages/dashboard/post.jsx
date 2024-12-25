import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Divider,
  TextField,
  Button,
  Modal,
  Paper,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { MoreVert, Close } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';

export default function Post({ post, authorName, profile }) {
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [likeByPost, setLikeByPost] = useState({});

  useEffect(() => {
    fetchComments();
    fetchLikes(post._id);
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/comments/${post._id}`,
        { withCredentials: true },
      );
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchLikes = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/likes/${postId}`,
        { withCredentials: true },
      );
      setLikeByPost(response.data);
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const handleAddComment = async () => {
    if (!commentInput.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:8000/comments/${post._id}`,
        { content: commentInput },
        { withCredentials: true },
      );
      setComments((prevComments) => [...prevComments, response.data]);
      setCommentInput('');
      fetchComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const createdAt = post.createdAt ? new Date(post.createdAt) : null;
  const relativeTime = createdAt
    ? formatDistanceToNow(createdAt, { addSuffix: true })
    : '';

  const handleLikeToggle = async (postId) => {
    try {
      // Check if the post is already liked by the user
      const isLiked = likeByPost[postId]?.liked;

      // If liked, remove the like, otherwise add it
      if (isLiked) {
        await axios.delete(`http://localhost:8000/likes/remove/${postId}`, {
          withCredentials: true,
        });
      } else {
        await axios.post(
          `http://localhost:8000/likes/add/${postId}`,
          {},
          { withCredentials: true },
        );
      }

      // After the like action, update the local state
      setLikeByPost((prev) => ({
        ...prev,
        [postId]: {
          ...prev[postId],
          liked: !isLiked, // Toggle the like status
        },
      }));

      // Fetch updated likes after toggling
      fetchLikes(postId);
    } catch (error) {
      console.error(
        'Error toggling like:',
        error.response?.data || error.message,
      );
    }
  };

  const toggleCommentsModal = () => {
    setIsCommentsModalOpen(!isCommentsModalOpen);
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
          <Box>
            <IconButton
              color={post.isLiked ? 'error' : 'default'}
              onClick={() => handleLikeToggle(post._id)}
              aria-label="like"
            >
              <FavoriteIcon />
            </IconButton>
          </Box>

          <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {likeByPost.length} people like it

          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            cursor: 'pointer',
            borderBottom: '1px dashed gray',
          }}
          onClick={toggleCommentsModal}
        >
          {comments.length} comments
        </Typography>
      </Box>

      {/* Comments Modal */}
      <Modal open={isCommentsModalOpen} onClose={toggleCommentsModal}>
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '80%',
            overflowY: 'auto',
            padding: 3,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <Typography variant="h6">Comments</Typography>
            <IconButton onClick={toggleCommentsModal}>
              <Close />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box>
            {comments.map((comment, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Avatar
                    src={comment.author?.profilePicture || 'default-image-url'}
                    alt="Author"
                    sx={{ width: 32, height: 32 }}
                  />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {comment.author
                        ? `${comment.author.firstname} ${comment.author.lastname}`
                        : 'Anonymous'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </Typography>
                    <Typography variant="body1">{comment.content}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Write a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
            >
              Add
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
}
