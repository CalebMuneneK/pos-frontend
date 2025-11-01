import React, { useState } from 'react'
import { Avatar, Container, Paper, TextField, Typography, Box, Button, Grid, Link } from '@mui/material';
import MailLockOutlinedIcon from '@mui/icons-material/MailLockOutlined';

const LoginSignup = () => {
  const [action, setAction] = useState("Sign In");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://posapi-django.onrender.com/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const data = await response.json();
      console.log("Tokens:", data);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      alert("Login successful ✅");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "primary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <MailLockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          {action}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {action === "Sign Up" && (
            <TextField
              placeholder="Enter Username"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          {action !== "Sign Up" && (
            <TextField
              placeholder="Enter Username"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          {/* Removed Email field from UI */}

          {action !== "Forgot Password" && (
            <TextField
              placeholder="Enter Password"
              type="password"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          {error && <Typography color="error">{error}</Typography>}

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
            {action}
          </Button>
        </Box>

        <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
          {action !== "Forgot Password" && (
            <Grid>
              <Link component="button" onClick={() => setAction("Forgot Password")}>
                Forgot Password
              </Link>
            </Grid>
          )}
          {action === "Sign In" ? (
            <Grid>
              <Link component="button" onClick={() => setAction("Sign Up")}>
                Sign Up
              </Link>
            </Grid>
          ) : (
            <Grid>
              <Link component="button" onClick={() => setAction("Sign In")}>
                Already Have Account? Sign In
              </Link>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default LoginSignup;