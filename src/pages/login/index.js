import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import useStyles from "./styles";

function LoginPage() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const mockedEmail = "admin@admin.com";
  const mockedPassword = "admin";

  const validate = () => {
    let tempErrors = { email: "", password: "" };
    let formIsValid = true;

    if (!email) {
      tempErrors.email = "Email is required";
      formIsValid = false;
    } else if (email.toLowerCase() !== mockedEmail) {
      tempErrors.email = "Invalid email";
      formIsValid = false;
    }

    if (!password) {
      tempErrors.password = "Password is required";
      formIsValid = false;
    } else if (password !== mockedPassword) {
      tempErrors.password = "Invalid password";
      formIsValid = false;
    }

    if (email.toLowerCase() === mockedEmail && password === mockedPassword) {
      tempErrors.email = "";
      tempErrors.password = "";
      formIsValid = true;
    } else {
      formIsValid = false;
    }

    setErrors(tempErrors);
    return (
      formIsValid &&
      email.toLowerCase() === mockedEmail &&
      password === mockedPassword
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      sessionStorage.setItem("auth", "true");
      navigate("/app");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  return (
    <Box className={classes.mainWrapper}>
      <Paper className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h4" className={classes.title}>
          Sign In
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          className={classes.form}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            error={!!errors.email}
            helperText={errors.email}
            className={classes.field}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            error={!!errors.password}
            helperText={errors.password}
            className={classes.field}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginPage;
