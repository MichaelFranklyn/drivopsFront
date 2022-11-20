import AddIcon from "@mui/icons-material/Add";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Grid, IconButton, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";
import * as React from "react";

import axios from "../../services/api";
import { getItem, setItem } from "../../utils/localStorage";
import { moneyMask } from "../../utils/moneyMask";
import { errorMessage, successMessage } from "../../utils/reactToastify";
import SalesModal from "../SalesModal";
import Title from "../Title";

export default function Sales(props) {
  const token = getItem("token");
  const [typeSale, setTypeSale] = React.useState("");
  const [dataSale, setDataSale] = React.useState({
    id_car: "",
    id_seller: "",
    valor_carro: "",
    desconto: "",
    data_venda: "",
  });

  const btnAddSale = () => {
    props.setOpenModal3(true);
    setTypeSale("Adicionar");
  };

  const btnEditSale = (sale) => {
    props.setOpenModal3(true);
    setItem("idSale", sale.id);
    setDataSale({
      id_car: sale.id_car,
      id_seller: sale.id_seller,
      valor_carro: sale.valor_bruto,
      desconto: sale.desconto,
      data_venda: sale.data_venda,
    });
    setTypeSale("Editar");
  };

  const deleteSale = async (sale) => {
    try {
      await axios.delete(`/delSale/${sale.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      props.loadSales();

      successMessage("Venda deletada com sucesso!");
    } catch (error) {
      errorMessage("Oops... Tente mais tarde");
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
        <Title>Vendas</Title>
        <IconButton
          aria-label="delete"
          sx={{ borderRadius: "1rem" }}
          onClick={() => btnAddSale()}
        >
          <Typography variant="subtitle1">Adicionar</Typography>
          <AddIcon fontSize="medium" />
        </IconButton>
      </Grid>
      <TableContainer style={{ height: 300 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Vendedor</TableCell>
              <TableCell>Nome do Carro</TableCell>
              <TableCell>Marca do Carro</TableCell>
              <TableCell>Valor Bruto</TableCell>
              <TableCell>Desconto</TableCell>
              <TableCell>Valor Líquido</TableCell>
              <TableCell>Data da Venda</TableCell>
              <TableCell
                sx={{
                  width: "7rem",
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.listSales.map((sale, index) => (
              <TableRow key={index}>
                <TableCell>{sale.vendedor}</TableCell>
                <TableCell>{sale.nome_carro}</TableCell>
                <TableCell>{sale.marca_carro}</TableCell>
                <TableCell>{`R$ ${moneyMask(
                  String(Number(sale.valor_bruto).toFixed(2))
                )}`}</TableCell>
                <TableCell>{`${sale.desconto} %`}</TableCell>
                <TableCell>{`R$ ${moneyMask(
                  String(Number(sale.valor_liquido).toFixed(2))
                )}`}</TableCell>
                <TableCell>
                  {dayjs(sale.data_venda).add(1, "day").format("DD/MM/YYYY")}
                </TableCell>
                <TableCell sx={{ alignItems: "center" }}>
                  <IconButton
                    aria-label="edit"
                    onClick={() => btnEditSale(sale)}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteSale(sale)}
                  >
                    <DeleteForeverOutlinedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <SalesModal
        openModal3={props.openModal3}
        setOpenModal3={props.setOpenModal3}
        dataSale={dataSale}
        setDataSale={setDataSale}
        typeSale={typeSale}
        setTypeSale={setTypeSale}
      />
    </React.Fragment>
  );
}
