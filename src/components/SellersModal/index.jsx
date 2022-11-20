import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  alpha,
} from "@mui/material";

import axios from "../../services/api";
import { getItem } from "../../utils/localStorage";
import { errorMessage, successMessage } from "../../utils/reactToastify";

export default function SellersModal(props) {
  const token = getItem("token");

  const handleClose = () => {
    props.setOpenModal2(false);
    props.setDataSeller({
      nome: "",
      email: "",
    });
  };

  const handleChangeSeller = (prop) => (event) => {
    props.setDataSeller({ ...props.dataSeller, [prop]: event.target.value });
  };

  const addSeller = async (e) => {
    e.preventDefault();

    if (!props.dataSeller.nome || !props.dataSeller.email) {
      return errorMessage("Oops... Todos os campos são obrigatórios");
    }

    try {
      await axios.post("/sellers", props.dataSeller, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      props.setDataSeller({
        nome: "",
        email: "",
      });

      props.setOpenModal2(false);
      successMessage("Vendedor cadastrado com sucesso!");
    } catch (error) {
      errorMessage("Oops... Tente mais tarde");
    }
  };

  const updateSeller = async (e) => {
    e.preventDefault();
    const idSeller = getItem("idSeller");

    if (!props.dataSeller.nome || !props.dataSeller.email) {
      return errorMessage("Oops... Todos os campos são obrigatórios");
    }

    try {
      await axios.put(`/seller/${idSeller}`, props.dataSeller, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      props.setDataSeller({
        nome: "",
        email: "",
      });

      props.setOpenModal2(false);
      successMessage("Vendedor atualizado com sucesso!");
    } catch (error) {
      errorMessage("Oops... Tente mais tarde");
    }
  };

  return (
    <Dialog
      open={props.openModal2}
      onClose={handleClose}
      sx={{
        " .MuiPaper-root": {
          borderRadius: "1rem",
          display: "flex",
          justifyContent: "center",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          padding: "1.5rem 1rem 0 1rem",
        }}
      >
        <DialogTitle sx={{ padding: "0" }} fontWeight="bold">
          {props.typeSeller === "Adicionar"
            ? "Adicionar Vendedor"
            : "Editar Vendedor"}
        </DialogTitle>

        <IconButton
          onClick={() => handleClose()}
          sx={{
            width: "2rem",
            height: "2rem",
            position: "absolute",
            right: 7,
            top: 10,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ padding: { xs: "1rem" } }}>
        <Grid
          container
          sx={{
            "& .MuiInputBase-root.MuiOutlinedInput-root": {
              borderRadius: "1rem",
            },
          }}
          spacing={1.5}
        >
          <Grid item xs={12} sm={12}>
            <TextField
              id="nome"
              label="Nome"
              size="small"
              value={props.dataSeller.nome}
              onChange={handleChangeSeller("nome")}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              id="email"
              label="E-mail"
              size="small"
              value={props.dataSeller.email}
              onChange={handleChangeSeller("email")}
              fullWidth
              required
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={
                props.typeSeller === "Adicionar"
                  ? (e) => addSeller(e)
                  : (e) => updateSeller(e)
              }
              variant="contained"
              sx={{
                "&.MuiButtonBase-root": {
                  background:
                    "linear-gradient(136.64deg, #658DD1 1.59%, #2D3748 98.89%)",
                  borderRadius: "1rem",
                  textTransform: "capitalize",
                  "&:hover": {
                    background: `linear-gradient(136.64deg, ${alpha(
                      "#658DD1",
                      0.9
                    )} 1.59%, ${alpha("#2D3748", 0.9)} 98.89%)`,
                  },
                },
                width: "50%",
              }}
            >
              {props.typeSeller === "Adicionar" ? "Adicionar" : "Editar"}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
