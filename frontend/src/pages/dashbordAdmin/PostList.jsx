import React from "react";
import { Card, Typography, CardActions, Divider, Grid, CircularProgress, Box, Avatar, IconButton, Paper } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import UsersList from "./usersList";

const PostList = ({ posts, loading, users }) => {

  const getAuthorDetails = (authorId) => {

    return users.find(user => user._id === authorId);
  };

  return (
<Box sx={{ marginTop: "20px", display: "flex", justifyContent: "space-between", gap: "10px" }}>
{/* Liste des posts */}
<Box sx={{ width: "60%" }}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {posts.map((post, index) => {
              const author = getAuthorDetails(post.author);
              return (
                <Grid item xs={12} key={`${post.title}-${index}`}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "20px",
                      boxShadow: 3,
                      borderRadius: 2,
                      padding: 2,
                      backgroundColor: "#ffffff",
                      transition: "0.3s",
                      "&:hover": {
                        boxShadow: 6,
                        transform: "scale(1.01)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                      <Avatar
                        alt={author ? author.firstname + " " + author.lastname : "Unknown Author"}
                        src={author ? author.profilePicture : "default-image-url"} // Replace with your default image URL
                        sx={{ marginRight: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                          {author ? author.firstname + " " + author.lastname : "Unknown Author"}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {post.createdAt || "Just now"}
                        </Typography>
                      </Box>
                    </Box>

                    {post.image && (
                      <img
                        src={post.image}
                        alt="Post image"
                        style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: "8px" }}
                      />
                    )}

                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                      {post.content}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <CardActions sx={{ justifyContent: "space-between" }}>
                      <Box>
                        <IconButton color="error" aria-label="like">
                          <FavoriteIcon />
                        </IconButton>
                        <IconButton color="primary" aria-label="comment">
                          <ChatBubbleOutlineIcon />
                        </IconButton>
                        <IconButton color="default" aria-label="share">
                          <ShareIcon />
                        </IconButton>
                      </Box>
                      <Typography variant="caption" color="textSecondary">
                        {`${post.likes || 0} likes • ${post.comments.length || 0} comments`}
                      </Typography>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>

      {/* Liste des utilisateurs à droite */}
      <UsersList users={users}/>
    </Box>
  );
};

export default PostList;
