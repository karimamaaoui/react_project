import React, { useContext, useEffect, useState } from 'react';
import { Box, TextField, Button, IconButton, Divider } from '@mui/material';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import userSix from '../../assets/users/user-06.png';
import ImageIcon from '@mui/icons-material/Image';
import { useCookies } from 'react-cookie';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export default function Share({fetchPosts,profile}) {
  const [title, setTitle] = useState('');
  const [cookies] = useCookies(['jwt']);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { auth } = useContext(AuthContext);

  useEffect(() => {

  }, [auth.token, cookies.jwt]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setImage(null); 
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('userId', auth.userId);
    if (image) {
      formData.append('file', image);
    }

    try {
      setLoading(true);
      await axios.post('http://localhost:8000/api/posts/create', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTitle('');
      setContent('');
      setImage(null);
      fetchPosts();
      handleClose();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        gap: 2,
      }}
    >
      {/* User Avatar */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <img
          src={profile.profilePicture || userSix}
          alt="User"
          style={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title of your post"
          variant="outlined"
          fullWidth
          size="small"
          sx={{
            borderRadius: 2,
          }}
        />
      </Box>

      {/* Content Field */}

      <TextField
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        size="small"
        sx={{
          borderRadius: 2,
        }}
      />

      <Divider />

      {/* Icons and Share Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            startIcon={<ImageIcon />}
            variant="text"
            component="label"
            sx={{ color: '#0072b1' }}
          >
            Photo or Video
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {image && <span>{image.name}</span>}

          <IconButton sx={{ color: 'primary' }}>
            <RoomIcon />
          </IconButton>
          <IconButton sx={{ color: 'primary' }}>
            <EmojiEmotionsIcon />
          </IconButton>
        </Box>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            backgroundColor: 'primary',
            color: 'white',
            fontWeight: 500,
            padding: '6px 16px',
            borderRadius: 2,
            boxShadow: 1,
           }}
        >
          Share
        </Button>
      </Box>
    </Box>
  );
}
