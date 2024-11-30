import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Avatar,
  Grid,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

function ProfileEdit() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [profilePictureAvatar, setProfilePictureAvatar] = useState('');
  const [fileName, setFileName] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState([
    { title: '', description: '', link: '' },
  ]);
  const [socialLinks, setSocialLinks] = useState({ github: '', linkedin: '' });

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/auth/profile',
          {
            withCredentials: true,
          },
        );
        const user = response.data;
        setFirstname(user.firstname || '');
        setLastname(user.lastname || '');
        setProfilePicture(user.profilePicture || '');
        setProfilePictureAvatar(user.profilePicture || '');
        setBio(user.bio || '');

        let skillsArray =
          Array.isArray(user.skills) && user.skills[0]
            ? JSON.parse(user.skills[0])
            : [];

        // Join the skills into a comma-separated string
        setSkills(skillsArray.map((skill) => skill.trim()).join(', '));
        const fetchedProjects = Array.isArray(user.projects)
          ? user.projects
          : [{ title: '', description: '', link: '' }];
        setProjects(fetchedProjects);

        setSocialLinks(user.socialLinks || { github: '', linkedin: '' });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
      const previewURL = URL.createObjectURL(e.target.files[0]);
      setProfilePictureAvatar(previewURL);
    }
  };

  const handleSaveProfile = async () => {
    const formData = new FormData();

    formData.append('firstname', firstname || '');
    formData.append('lastname', lastname || '');
    formData.append('bio', bio || '');
    formData.append(
      'skills',
      JSON.stringify(skills.split(',').map((skill) => skill.trim())),
    );
    formData.append('projects', JSON.stringify(projects));
    formData.append('socialLinks', JSON.stringify(socialLinks));
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await axios.patch(
        'http://localhost:8000/api/auth/updateProfile',
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      console.log('Profile updated successfully:', response.data);
      toast.success('Profile updated successfully!');
      //Redirect to profile route after success
         setTimeout(() => {
          window.location.href = '/profile';
         }, 100);
    } catch (error) {
      toast.error('Error updating profile.');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>
      <Grid container spacing={4}>
        {/* Personal Information */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              value={firstname || ''}
              onChange={(e) => setFirstname(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              value={lastname || ''}
              onChange={(e) => setLastname(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Bio"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={bio || ''}
              onChange={(e) => setBio(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Skills (comma-separated)"
              variant="outlined"
              fullWidth
              value={skills || ''}
              onChange={(e) => setSkills(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Paper>
        </Grid>

        {/* Profile Picture */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Profile Picture
            </Typography>
            <Avatar
              alt="Profile Picture"
              src={profilePictureAvatar || ''}
              sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
            />
            <Typography variant="body2" gutterBottom>
              {fileName || 'No file selected'}
            </Typography>
            <Button variant="contained" component="label" sx={{ mb: 2 }}>
              Upload Picture
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </Paper>
        </Grid>

        {/* Projects */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Projects
            </Typography>
            {projects.map((project, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <TextField
                  label={`Project Title ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={project.title}
                  onChange={(e) => {
                    const updatedProjects = [...projects];
                    updatedProjects[index].title = e.target.value;
                    setProjects(updatedProjects);
                  }}
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  value={project.description}
                  onChange={(e) => {
                    const updatedProjects = [...projects];
                    updatedProjects[index].description = e.target.value;
                    setProjects(updatedProjects);
                  }}
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Link"
                  variant="outlined"
                  fullWidth
                  value={project.link}
                  onChange={(e) => {
                    const updatedProjects = [...projects];
                    if (updatedProjects[index]) {
                      updatedProjects[index].link = e.target.value;
                      setProjects(updatedProjects);
                    }
                  }}
                  sx={{ mb: 1 }}
                />
                <Divider sx={{ my: 2 }} />
              </Box>
            ))}
            <Button
              variant="outlined"
              onClick={() =>
                setProjects([
                  ...projects,
                  { title: '', description: '', link: '' },
                ])
              }
            >
              Add Project
            </Button>
          </Paper>
        </Grid>

        {/* Social Links */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Social Links
            </Typography>
            <TextField
              label="GitHub"
              variant="outlined"
              fullWidth
              value={socialLinks.github || ''}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, github: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              label="LinkedIn"
              variant="outlined"
              fullWidth
              value={socialLinks.linkedin || ''}
              onChange={(e) =>
                setSocialLinks({ ...socialLinks, linkedin: e.target.value })
              }
              sx={{ mb: 2 }}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="outlined" sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSaveProfile}>
          Save Profile
        </Button>
      </Box>
    </Box>
  );
}

export default ProfileEdit;
