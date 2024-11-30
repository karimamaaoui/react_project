import React, { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Box, Typography, Avatar, Container, Paper, Button } from '@mui/material';
import CoverOne from "../../assets/cover/cover-01.png";
import userSix from "../../assets/users/user-06.png";
import Feed from './feed';
import { useNavigate } from 'react-router-dom';  

function ProfileView() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cookies] = useCookies(["jwt"]);
    const { auth } = useContext(AuthContext);
    const [profile, setProfile] = useState([]); 
    const navigate = useNavigate(); 

    const fetchProfile = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/auth/profile", {
                withCredentials: true,
            });
            setProfile(response.data);
        } catch (error) {
            console.error("Error fetching Profile:", error);
        }
    };

    const fetchPosts = async () => {
        setLoading(true);
  
        try {
            const response = await axios.get("http://localhost:8000/api/posts/getPosts", {
                withCredentials: true,
            });
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
        fetchProfile();
    }, [auth.token, cookies.jwt]);

    const handleCompleteProfile = () => {
        navigate("/profile/edit");  
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
                {/* Profile Cover */}
                <Box sx={{ position: 'relative', width: '100%', height: 320 }}>
                    <img src={CoverOne} alt="Cover" style={{ width: '100%', height: 250, objectFit: 'cover' }} />
                    <Avatar
                        alt="User Image"
                        src={profile.profilePicture  || userSix}
                        sx={{
                            width: 150,
                            height: 150,
                            position: 'absolute',
                            top: 150,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            border: 3,
                            borderColor: 'white',
                        }}
                    />
                </Box>

                {/* Profile Info */}
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                         {profile.firstname} {profile.lastname}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 300 }}>
                        Hello my friends!
                    </Typography>
                </Box>

                {/* Button to complete profile */}
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleCompleteProfile}>
                        Complete Profile
                    </Button>
                </Box>

                {/* Feed Section */}
                <Paper sx={{ mt: 3, p: 2, width: '100%' }}>
                    <Feed posts={posts} profile={profile}  fetchPosts={fetchPosts}/>
                </Paper>
            </Box>
        </Container>
    );
}

export default ProfileView;
