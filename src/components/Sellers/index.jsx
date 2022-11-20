import AddIcon from "@mui/icons-material/Add";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Grid, IconButton, Typography } from "@mui/material";
import { TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

import axios from "../../services/api";
import { getItem, setItem } from "../../utils/localStorage";
import { errorMessage, successMessage } from "../../utils/reactToastify";
import SellersModal from "../SellersModal";
import Title from "../Title";

export default function Sellers(props) {
  const token = getItem("token");
  const [typeSeller, setTypeSeller] = React.useState("");
  const [dataSeller, setDataSeller] = React.useState({
    nome: "",
    email: "",
  });

  const btnAddSeller = () => {
    props.setOpenModal2(true);
    setTypeSeller("Adicionar");
  };

  const btnEditSeller = (seller) => {
    props.setOpenModal2(true);
    setItem("idSeller", seller.id);
    setDataSeller({
      nome: seller.nome,
      email: seller.email,
    });
    setTypeSeller("Editar");
  };

  const deleteSeller = async (seller) => {
    try {
      await axios.delete(`/delSeller/${seller.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      props.loadSellers();

      successMessage("Vendedor deletado com sucesso!");
    } catch (error) {
      const dataError = error.response.data.mensagem;
      if (
        dataError !==
        'delete from "sellers" where "id" = $1 - update or delete on table "sellers" violates foreign key constraint "sales_id_seller_fkey" on table "sales"'
      ) {
        errorMessage("Oops... Tente mais tarde");
      }
      if (
        dataError ===
        'delete from "sellers" where "id" = $1 - update or delete on table "sellers" violates foreign key constraint "sales_id_seller_fkey" on table "sales"'
      ) {
        errorMessage(
          "Vendedor não pode ser excluído, está vinculado à uma venda!"
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
        <Title>Vendedores</Title>
        <IconButton
          aria-label="delete"
          sx={{ borderRadius: "1rem" }}
          onClick={() => btnAddSeller()}
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
              <TableCell>E-mail</TableCell>
              <TableCell
                sx={{
                  width: "7rem",
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.listSellers.map((seller, index) => (
              <TableRow key={index} sx={{ height: "49px" }}>
                <TableCell>{seller.id}</TableCell>
                <TableCell>{seller.nome}</TableCell>
                <TableCell>{seller.email}</TableCell>
                <TableCell sx={{ alignItems: "center" }}>
                  <IconButton
                    aria-label="edit"
                    onClick={() => btnEditSeller(seller)}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteSeller(seller)}
                  >
                    <DeleteForeverOutlinedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <SellersModal
        openModal2={props.openModal2}
        setOpenModal2={props.setOpenModal2}
        dataSeller={dataSeller}
        setDataSeller={setDataSeller}
        typeSeller={typeSeller}
        setTypeSeller={setTypeSeller}
      />
    </React.Fragment>
  );
}
