import React from "react";
import { Card, Typography, Grid,  Box, Avatar, Paper } from "@mui/material";

function UsersList({users}) {
  return (
<>


      {/* Liste des utilisateurs à droite */}
      <Paper sx={{ width: { xs: "100%", md: "35%" }, padding: 2, maxHeight: '400px', overflowY: 'auto', marginTop: { xs: 2, md: 0 } }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Users</Typography>
        <Grid container spacing={2}>
          {users.map((user, index) => (
            <Grid item xs={12} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt={user.name} src={user.profilePicture||user.image} sx={{ marginRight: 2 }} />
                <Typography variant="subtitle1">{user.email}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
</>

)
}

export default UsersList