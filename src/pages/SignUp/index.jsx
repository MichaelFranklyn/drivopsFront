import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React from "react";
import { useNavigate } from "react-router-dom";

import BackgroundSignUp from "../../assets/backgroundSignUp.jpg";
import IconDrivops from "../../assets/iconDrivops.jpg";
import axios from "../../services/api";
import { errorMessage, successMessage } from "../../utils/reactToastify";

export default function SignUp() {
  const navigateTo = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      await axios.post("/cadastro", {
        nome: data.get("nome"),
        senha: data.get("password"),
      });

      successMessage("Cadastro realizado com sucesso!");

      setTimeout(() => {
        navigateTo("/");
      }, "1100");
    } catch (error) {
      errorMessage("Oops... Tente mais tarde");
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={0.3}
        sx={{
          backgroundColor: "#365FAE",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={4.7}
        component={Paper}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            pb: 6,
            mx: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar src={IconDrivops} sx={{ width: 160, height: 160 }} />
          <Typography component="h1" variant="h4">
            Cadastre-se
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nome"
              label="Nome"
              name="nome"
              autoComplete="nome"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastre-se
            </Button>
            <Grid container>
              <Grid
                item
                container
                justifyContent="center"
                alignItems={"center"}
              >
                <Link href="/" variant="body2">
                  {"Já tem uma conta? Faça o login aqui!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${BackgroundSignUp})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
}
