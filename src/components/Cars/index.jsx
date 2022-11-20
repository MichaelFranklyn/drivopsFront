import AddIcon from "@mui/icons-material/Add";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import * as React from "react";

import axios from "../../services/api";
import { getItem, setItem } from "../../utils/localStorage";
import { moneyMask } from "../../utils/moneyMask";
import { errorMessage, successMessage } from "../../utils/reactToastify";
import CarsModal from "../CarsModal";
import Title from "../Title";

export default function Cars(props) {
  const token = getItem("token");
  const [typeCar, setTypeCar] = React.useState("");
  const [dataCar, setDataCar] = React.useState({
    nome: "",
    marca: "",
    quantidade: "",
    valor: "",
  });

  const btnAddCar = () => {
    props.setOpenModal(true);
    setTypeCar("Adicionar");
  };

  const btnEditCar = (car) => {
    props.setOpenModal(true);
    setItem("idCar", car.id);
    setDataCar({
      nome: car.nome,
      marca: car.marca,
      quantidade: car.quantidade,
      valor: car.valor,
    });
    setTypeCar("Editar");
  };

  const deleteCar = async (car) => {
    try {
      await axios.delete(`/delcar/${car.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      props.loadCars();

      successMessage("Carro deletado com sucesso!");
    } catch (error) {
      const dataError = error.response.data.mensagem;
      if (
        dataError !==
        'delete from "cars" where "id" = $1 - update or delete on table "cars" violates foreign key constraint "sales_id_car_fkey" on table "sales"'
      ) {
        errorMessage("Oops... Tente mais tarde");
      }
      if (
        dataError ===
        'delete from "cars" where "id" = $1 - update or delete on table "cars" violates foreign key constraint "sales_id_car_fkey" on table "sales"'
      ) {
        errorMessage(
          "Carro não pode ser excluído, está vinculado à uma venda!"
        );
      }
    }
  };
  return (
    <React.Fragment>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title>Carros</Title>
        <IconButton
          aria-label="delete"
          sx={{ borderRadius: "1rem" }}
          onClick={() => btnAddCar()}
        >
          <Typography variant="subtitle1">Adicionar</Typography>
          <AddIcon fontSize="medium" />
        </IconButton>
      </Grid>
      <TableContainer style={{ height: 300 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Qtd</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell
                sx={{
                  width: "7rem",
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.listCars.map((car, index) => (
              <TableRow key={index}>
                <TableCell>{car.id}</TableCell>
                <TableCell>{car.nome}</TableCell>
                <TableCell>{car.marca}</TableCell>
                <TableCell>{car.quantidade}</TableCell>
                <TableCell>{`R$ ${moneyMask(
                  String(Number(car.valor).toFixed(2))
                )}`}</TableCell>
                <TableCell sx={{ alignItems: "center" }}>
                  <IconButton aria-label="edit" onClick={() => btnEditCar(car)}>
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteCar(car)}
                  >
                    <DeleteForeverOutlinedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CarsModal
        openModal={props.openModal}
        setOpenModal={props.setOpenModal}
        dataCar={dataCar}
        setDataCar={setDataCar}
        typeCar={typeCar}
        setTypeCar={setTypeCar}
      />
    </React.Fragment>
  );
}
