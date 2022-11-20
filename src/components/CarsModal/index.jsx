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

export default function CarsModal(props) {
  const token = getItem("token");

  const handleClose = () => {
    props.setOpenModal(false);
    props.setDataCar({
      nome: "",
      marca: "",
      quantidade: "",
      valor: "",
    });
  };

  const handleChangeCar = (prop) => (event) => {
    props.setDataCar({ ...props.dataCar, [prop]: event.target.value });
  };

  const addCar = async (e) => {
    e.preventDefault();

    if (
      !props.dataCar.nome ||
      !props.dataCar.marca ||
      !props.dataCar.quantidade ||
      !props.dataCar.valor
    ) {
      return errorMessage("Oops... Todos os campos são obrigatórios");
    }

    try {
      await axios.post("/cars", props.dataCar, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      props.setDataCar({
        nome: "",
        marca: "",
        quantidade: "",
        valor: "",
      });

      props.setOpenModal(false);
      successMessage("Carro cadastrado com sucesso!");
    } catch (error) {
      errorMessage("Oops... Tente mais tarde");
    }
  };

  const updateCar = async (e) => {
    e.preventDefault();
    const idCar = getItem("idCar");

    if (
      !props.dataCar.nome ||
      !props.dataCar.marca ||
      !props.dataCar.quantidade ||
      !props.dataCar.valor
    ) {
      return errorMessage("Oops... Todos os campos são obrigatórios");
    }

    try {
      await axios.put(`/car/${idCar}`, props.dataCar, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      props.setDataCar({
        nome: "",
        marca: "",
        quantidade: "",
        valor: "",
      });

      props.setOpenModal(false);
      successMessage("Carro atualizado com sucesso!");
    } catch (error) {
      console.log(error);
      errorMessage("Oops... Tente mais tarde");
    }
  };

  return (
    <Dialog
      open={props.openModal}
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
          {props.typeCar === "Adicionar" ? "Adicionar Carro" : "Editar Carro"}
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
              value={props.dataCar.nome}
              onChange={handleChangeCar("nome")}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              id="marca"
              label="Marca"
              size="small"
              value={props.dataCar.marca}
              onChange={handleChangeCar("marca")}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              id="quantidade"
              label="Qtd"
              size="small"
              variant="outlined"
              value={props.dataCar.quantidade}
              onChange={handleChangeCar("quantidade")}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              required
              autoFocus
              id="valor"
              label="Valor"
              size="small"
              variant="outlined"
              value={props.dataCar.valor}
              onChange={handleChangeCar("valor")}
              fullWidth
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
                props.typeCar === "Adicionar"
                  ? (e) => addCar(e)
                  : (e) => updateCar(e)
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
              {props.typeCar === "Adicionar" ? "Adicionar" : "Editar"}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
