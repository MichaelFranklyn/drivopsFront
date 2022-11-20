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
    props.setOpenModal3(false);
    props.setDataSale({
      id_car: "",
      id_seller: "",
      valor_carro: "",
      desconto: "",
      data_venda: "",
    });
  };

  const handleChangeSale = (prop) => (event) => {
    props.setDataSale({ ...props.dataSale, [prop]: event.target.value });
  };

  const addSale = async (e) => {
    e.preventDefault();

    if (
      !props.dataSale.id_car ||
      !props.dataSale.id_seller ||
      !props.dataSale.valor_carro ||
      !props.dataSale.desconto ||
      !props.dataSale.data_venda
    ) {
      return errorMessage("Oops... Todos os campos são obrigatórios");
    }

    try {
      await axios.post("/sales", props.dataSale, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      props.setDataSale({
        id_car: "",
        id_seller: "",
        valor_carro: "",
        desconto: "",
        data_venda: "",
      });

      props.setOpenModal3(false);
      successMessage("Venda cadastrada com sucesso!");
    } catch (error) {
      errorMessage("Oops... Tente mais tarde");
    }
  };

  const updateSale = async (e) => {
    e.preventDefault();
    const idSale = getItem("idSale");

    if (
      !props.dataSale.id_car ||
      !props.dataSale.id_seller ||
      !props.dataSale.valor_carro ||
      !props.dataSale.desconto ||
      !props.dataSale.data_venda
    ) {
      return errorMessage("Oops... Todos os campos são obrigatórios");
    }

    try {
      await axios.put(`/sale/${idSale}`, props.dataSale, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      props.setDataSale({
        id_car: "",
        id_seller: "",
        valor_carro: "",
        desconto: "",
        data_venda: "",
      });

      props.setOpenModal3(false);
      successMessage("Venda atualizada com sucesso!");
    } catch (error) {
      errorMessage("Oops... Tente mais tarde");
    }
  };

  return (
    <Dialog
      open={props.openModal3}
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
          {props.typeSale === "Adicionar" ? "Adicionar Venda" : "Editar Venda"}
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
              id="id_car"
              label="Id do Carro"
              size="small"
              value={props.dataSale.id_car}
              onChange={handleChangeSale("id_car")}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              id="id_seller"
              label="Id do Vendedor"
              size="small"
              value={props.dataSale.id_seller}
              onChange={handleChangeSale("id_seller")}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              id="valor_carro"
              label="Valor Original"
              size="small"
              variant="outlined"
              value={props.dataSale.valor_carro}
              onChange={handleChangeSale("valor_carro")}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="desconto"
              label="Desconto"
              size="small"
              variant="outlined"
              value={props.dataSale.desconto}
              onChange={handleChangeSale("desconto")}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              required
              type="date"
              id="data_venda"
              size="small"
              variant="outlined"
              value={props.dataSale.data_venda}
              onChange={handleChangeSale("data_venda")}
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
                props.typeSale === "Adicionar"
                  ? (e) => addSale(e)
                  : (e) => updateSale(e)
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
              {props.typeSale === "Adicionar" ? "Adicionar" : "Editar"}
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
