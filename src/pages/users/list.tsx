import React from "react";
import {
  CrudFilters,
  getDefaultFilter,
  HttpError,
  IResourceComponentsProps,
  useDelete,
  useNavigation,
} from "@pankod/refine-core";
import {
  DataGrid,
  GridColumns,
  Avatar,
  useDataGrid,
  Button,
  TextField,
  Box,
  InputAdornment,
  CardHeader,
  Card,
  CardContent,
  List,
  GridActionsCellItem,
} from "@pankod/refine-mui";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "@pankod/refine-react-hook-form";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { IUser, IUserFilterVariables } from "interfaces";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const { mutate: mutateDelete } = useDelete();
  const { edit, show } = useNavigation();

  const { dataGridProps, search, filters } = useDataGrid<
    IUser,
    HttpError,
    IUserFilterVariables
  >({
    initialPageSize: 10,
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { q } = params;

      filters.push({
        field: "q",
        operator: "eq",
        value: q !== "" ? q : undefined,
      });

      return filters;
    },
  });

  const columns = React.useMemo<GridColumns<IUser>>(
    () => [
      {
        field: "avatar",
        headerName: "Фото",
        align: "center",
        headerAlign: "center",
        renderCell: function render({ row }) {
          return (
            <Avatar
              variant="rounded"
              sx={{ width: 70, height: 70 }}
              src={row.avatar}
            />
          );
        },
        width: 80,
      },
      {
        field: "phone",
        headerName: "Телефон",
        align: "center",
        headerAlign: "center",
        width: 160,
      },

      {
        field: "name",
        headerName: "Имя",
        align: "center",
        headerAlign: "center",
        flex: 1,
        width: 160,
      },
      {
        field: "email",
        headerName: "Почта",
        align: "center",
        headerAlign: "center",
        width: 160,
      },

      {
        field: "createdAt",
        headerName: "Создан",
        align: "center",
        headerAlign: "center",
        width: 160,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "#",
        align: "center",
        headerAlign: "center",
        width: 30,
        sortable: false,
        getActions: ({ row }) => [
          <GridActionsCellItem
            key={1}
            icon={<EditIcon color="success" />}
            sx={{ padding: "2px 6px" }}
            label="Редактировать"
            showInMenu
            onClick={() => edit("users", row.id)}
          />,
          <GridActionsCellItem
            key={2}
            icon={<CloseOutlinedIcon color="error" />}
            sx={{ padding: "2px 6px" }}
            label="Удалить"
            showInMenu
            onClick={() => {
              mutateDelete({
                resource: "users",
                id: row.id,
                mutationMode: "undoable",
              });
            }}
          />,
        ],
      },
    ],
    []
  );

  const { register, handleSubmit } = useForm<
    IUser,
    HttpError,
    IUserFilterVariables
  >({
    defaultValues: {
      q: getDefaultFilter("q", filters, "eq"),
    },
  });

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardHeader title="Поиск" />
        <CardContent sx={{ pt: 0 }}>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            autoComplete="off"
            onSubmit={handleSubmit(search)}
          >
            <TextField
              {...register("q")}
              label="Поиск"
              fullWidth
              size="small"
              sx={{
                mr: 2,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <br />
            <Button type="submit" variant="contained">
              Отправить
            </Button>
          </Box>
        </CardContent>
      </Card>
      <List cardProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}>
        <DataGrid
          {...dataGridProps}
          columns={columns}
          filterModel={undefined}
          autoHeight
          rowHeight={80}
          onRowClick={({ id }) => {
            show("users", id);
          }}
          rowsPerPageOptions={[10, 20, 50, 100]}
          sx={{
            ...dataGridProps.sx,
            "& .MuiDataGrid-row": {
              cursor: "pointer",
            },
          }}
        />
      </List>
    </>
  );
};
