import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  Typography,
  CardActions,
  Divider,
  Grid,
  CircularProgress,
  Box,
  Avatar,
  IconButton,
  Paper,
  TextField,
  Modal,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ShareIcon from '@mui/icons-material/Share';
import UsersList from './usersList';
import { useCookies } from 'react-cookie';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

const PostList = ({ posts, loading, users }) => {
  const [commentsByPost, setCommentsByPost] = useState({});
  const [commentInput, setCommentInput] = useState({}); // Track comment input for each post
  const [cookies] = useCookies(['jwt']);
  const { auth } = useContext(AuthContext);
  const [openCommentModal, setOpenCommentModal] = useState(false); // Modal state
  const [selectedPost, setSelectedPost] = useState(null); // Track the selected post for modal

  const getAuthorDetails = (authorId) => {
    return users.find((user) => user._id === authorId);
  };

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/comments/${postId}`,
        {
          withCredentials: true,
        },
      );
      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: response.data,
      }));
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
    }
  };

  const handleCommentChange = (postId, value) => {
    setCommentInput((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  const handleSubmitComment = async (postId) => {
    const content = commentInput[postId];
    if (!content) return;

    try {
      const response = await axios.post(
        `http://localhost:8000/comments/${postId}`,
        { content },
        { withCredentials: true },
      );
      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), response.data],
      }));
      setCommentInput((prev) => ({
        ...prev,
        [postId]: '', // Clear input after submission
      }));
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setOpenCommentModal(true);
  };

  const handleCloseModal = () => {
    setOpenCommentModal(false);
    setSelectedPost(null);
  };

  useEffect(() => {
    if (posts && posts.length > 0) {
      posts.forEach((post) => {
        if (!commentsByPost[post._id]) {
          fetchComments(post._id);
        }
      });
    }
  }, [auth.token, cookies.jwt, posts]);

  return (
    <Box
      sx={{
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px',
      }}
    >
      {/* Liste des posts */}
      <Box sx={{ width: '60%' }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {posts.map((post, index) => {
              const author = getAuthorDetails(post.author);
              const postComments = commentsByPost[post._id] || [];

              const createdAt = post.createdAt
                ? new Date(post.createdAt)
                : null;
              const relativeTime = createdAt
                ? formatDistanceToNow(createdAt, { addSuffix: true })
                : '';

              return (
                <Grid item xs={12} key={`${post.title}-${index}`}>
                  <Card
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginBottom: '20px',
                      boxShadow: 3,
                      borderRadius: 2,
                      padding: 2,
                      backgroundColor: '#ffffff',
                      transition: '0.3s',
                      '&:hover': {
                        boxShadow: 6,
                        transform: 'scale(1.01)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: 2,
                      }}
                    >
                      <Avatar
                        alt={
                          author
                            ? author.firstname + ' ' + author.lastname
                            : 'Unknown Author'
                        }
                        src={
                          author ? author.profilePicture : 'default-image-url'
                        }
                        sx={{ marginRight: 2 }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 'bold' }}
                        >
                          {author
                            ? author.firstname + ' ' + author.lastname
                            : 'Unknown Author'}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {relativeTime || 'Just now'}
                        </Typography>
                      </Box>
                    </Box>

                    {post.image && (
                      <img
                        src={post.image}
                        alt="Post image"
                        style={{
                          width: '100%',
                          maxHeight: '300px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                      />
                    )}

                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                      {post.content}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
                      Comments:
                    </Typography>
                    <Box>
                      {postComments.slice(0, 2).map((comment, idx) => {
                        const createdAtComment = comment.createdAt
                          ? new Date(comment.createdAt)
                          : null;
                        const relativeTimeComment = createdAtComment
                          ? formatDistanceToNow(createdAtComment, { addSuffix: true })
                          : '';

                        const author = comment.author;
                        return (
                          <Box
                            key={idx}
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              marginBottom: 2,
                              gap: 2,
                            }}
                          >
                            <Avatar
                              alt={
                                author
                                  ? `${author.firstname} ${author.lastname}`
                                  : 'Unknown Author'
                              }
                              src={author?.profilePicture || 'default-image-url'}
                              sx={{ width: 36, height: 36 }}
                            />
                            <Box>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 'bold' }}
                              >
                                {author
                                  ? `${author.firstname} ${author.lastname}`
                                  : 'Unknown Author'}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                              >
                                {relativeTimeComment}
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{ marginTop: 1 }}
                              >
                                {comment.content}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                      {postComments.length > 2 && (
                        <Button
                          onClick={() => handleOpenModal(post)}
                          color="primary"
                        >
                          Show More
                        </Button>
                      )}
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <CardActions sx={{ justifyContent: 'space-between' }}>
                      <Box>
                        <IconButton color="error" aria-label="like">
                          <FavoriteIcon />
                        </IconButton>
                        <IconButton color="default" aria-label="share">
                          <ShareIcon />
                        </IconButton>
                      </Box>
                      <Typography variant="caption" color="textSecondary">
                        {`${post.likes || 0} likes • ${postComments.length || 0} comments`}
                      </Typography>
                    </CardActions>

                    {/* Add Comment Section */}
                    <Box sx={{ marginTop: 2 }}>
                      <TextField
                        label="Add a comment..."
                        fullWidth
                        variant="outlined"
                        value={commentInput[post._id] || ''}
                        onChange={(e) =>
                          handleCommentChange(post._id, e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSubmitComment(post._id);
                          }
                        }}
                        size="small"
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              color="primary"
                              onClick={() => handleSubmitComment(post._id)}
                            >
                              <KeyboardArrowRightIcon />
                            </IconButton>
                          ),
                        }}
                      />
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>

      {/* Modal to show all comments */}
      <Modal
        open={openCommentModal}
        onClose={handleCloseModal}
        aria-labelledby="comments-modal-title"
        aria-describedby="comments-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: '80%',
            maxHeight: '80%',
            overflowY: 'auto',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" id="comments-modal-title">
            Comments
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box>
            {selectedPost &&
              commentsByPost[selectedPost._id]?.map((comment, idx) => {
                const createdAtComment = comment.createdAt
                  ? new Date(comment.createdAt)
                  : null;
                const relativeTimeComment = createdAtComment
                  ? formatDistanceToNow(createdAtComment, { addSuffix: true })
                  : '';

                return (
                  <Box
                    key={idx}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: 2,
                      gap: 2,
                    }}
                  >
                    <Avatar
                      alt={
                        comment.author
                          ? `${comment.author.firstname} ${comment.author.lastname}`
                          : 'Unknown Author'
                      }
                      src={comment.author?.profilePicture || 'default-image-url'}
                      sx={{ width: 36, height: 36 }}
                    />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {comment.author
                          ? `${comment.author.firstname} ${comment.author.lastname}`
                          : 'Unknown Author'}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {relativeTimeComment}
                      </Typography>
                      <Typography variant="body1" sx={{ marginTop: 1 }}>
                        {comment.content}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default PostList;
