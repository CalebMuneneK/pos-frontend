import React, { useState } from 'react'
import {Avatar, Container, Paper, TextField, Typography,Box, Button, Grid,Link} from '@mui/material';
import MailLockOutlinedIcon from '@mui/icons-material/MailLockOutlined';

const LoginSignup = () => {
    const [action,setAction] = useState("Sign In");
  return (
    <Container maxWidth="xs">
        <Paper elevation={10} sx={{marginTop:8,padding:2}}>
          <Avatar
          sx={{
            mx:"auto",
            bgcolor:"primary.main",
            textAlign:"center",
            mb:1,
          }}
          >
            <MailLockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5" sx={{textAlign:"center"}}>
           {action}
          </Typography>
          <Box component="form" noValidate sx={{mt:1}}>
            {action === "Sign Up" &&(
                 <TextField
              placeholder="Enter Username"
              fullWidth
              required
              sx={{mb:2}}
              />
            )}          
               <TextField
              placeholder="Enter Email"
              name="email"
              type="email"
              fullWidth
              required
              sx={{mb:2}}
              />
              {action !== "Forgot Password" &&(
                   <TextField
              placeholder="Enter Password"
              type="password"
              fullWidth
              required
              sx={{mb:2}}
              />
              )}
            
              <Button type="submit" variant="contained" fullWidth sx={{mt:1}}>{action}</Button>
          </Box>
          <Grid container justifyContent="space-between" sx={{mt:1}}>
            {action !== "Forgot Password" &&(
             <Grid item>
                <Link component="button" onClick={()=>{setAction("Forgot Password")}}>Forgot Password</Link>
            </Grid>
            )}

            {action === "Sign In"?(
                <Grid item>
                <Link component="button" onClick={()=>{setAction("Sign Up")}}>Sign Up</Link>
            </Grid>
            ):(
                    <Grid item>
                <Link component="button" onClick={()=>{setAction("Sign In")}}>Already Have Account? Sign In</Link>
            </Grid>
            )}
           
        
          </Grid>
        </Paper>

    </Container>
  )
}

export default LoginSignup