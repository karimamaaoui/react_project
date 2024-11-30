import React, { useEffect, useContext, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useCookies } from "react-cookie";
import ImageIcon from "@mui/icons-material/Image";

import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const PostFormModal = ({ fetchPosts }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["jwt"]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setImage(null);
  };
  const { auth } = useContext(AuthContext);

  useEffect(() => {}, [auth.token, cookies.jwt]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("userId", auth.userId);
    if (image) {
      formData.append("file", image); 
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:8000/api/posts/create", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTitle("");
      setContent("");
      setImage(null);
      handleClose();
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          display: "block",
          margin: "20px auto",
          backgroundColor: "#0072b1",
        }}
      >
        Create Post
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
        >
          Create New Post
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 2,
              boxShadow: 2,
              borderRadius: 2,
              backgroundColor: "#fff",
            }}
          >
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title of your post"
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: "20px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                },
              }}
            />

            <TextField
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your content here..."
              variant="outlined"
              multiline
              minRows={3}
              fullWidth
              sx={{
                borderRadius: "20px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                },
              }}
            />

            {/* Image Upload Section */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                startIcon={<ImageIcon />}
                variant="text"
                component="label"
                sx={{ color: "#0072b1" }}
              >
                Photo or Video
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
              {image && (
                <span>{image.name}</span> 
              )}
                   <IconButton sx={{ color: 'primary' }}>
            <RoomIcon />
          </IconButton>
          <IconButton sx={{ color: 'primary' }}>
            <EmojiEmotionsIcon />
          </IconButton>
     
            </Box>

            <Box sx={{ textAlign: "center", pt: 2 }}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{
                  borderRadius: "20px",
                  padding: "10px 20px",
                }}
              >
                {loading ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostFormModal;
