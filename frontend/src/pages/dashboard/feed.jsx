import React from 'react';
import { Box, Paper } from '@mui/material';
import Share from './share';
import Post from './post';

export default function Feed({posts, profile,fetchPosts }) {
  return (
    <Box sx={{ flex: 5.5 }}>
      <Paper sx={{ padding: 2 }}>
        <Share fetchPosts={fetchPosts} profile={profile}/>
        {posts.map((p,index) => {
          const author = profile;

          return <Post key={index} post={p} profile={profile} authorName={author ? author.firstname : "Unknown name"} />;
        })}
      </Paper>
    </Box>
  );
}
