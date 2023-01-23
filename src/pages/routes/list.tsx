import React from "react";
import {
  CrudFilters,
  getDefaultFilter,
  HttpError,
  IResourceComponentsProps,
  useTranslate,
  useDelete,
  useNavigation,
} from "@pankod/refine-core";
import {
  DataGrid,
  Grid,
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
import { IRoute, IUser, IUserFilterVariables } from "interfaces";

export const RouteList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { mutate: mutateDelete } = useDelete();
  const { edit, show } = useNavigation();

  const { dataGridProps, search, filters } = useDataGrid<
    IRoute,
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

  const columns = React.useMemo<GridColumns<IRoute>>(
    () => [
      {
        field: "id",
        headerName: "№",
        headerAlign: "center",
        align: "center",
        width: 40,
      },
      {
        field: "name",
        headerName: "Имя ",
        headerAlign: "center",
        align: "center",
        width: 180,
      },
      {
        field: "length",
        headerName: "Длина",
        headerAlign: "center",
        align: "center",
        width: 80,
      },
      {
        field: "time",
        headerName: "Время",
        headerAlign: "center",
        align: "center",
        width: 80,
      },
      {
        field: "price",
        headerName: "Стоимость",
        headerAlign: "center",
        align: "center",
        width: 100,
      },
      {
        field: "isActive",
        headerName: "Активность",
        headerAlign: "center",
        align: "center",
        width: 110,
      },
      {
        field: "desc",
        headerName: "Описание",
        headerAlign: "center",
        align: "center",
        width: 180,
        flex: 1,
      },
      {
        field: "images",
        headerName: "Изображения",
        headerAlign: "center",
        align: "center",
        width: 120,
        // renderCell: function render({ row }) {
        //   return (
        //     <Avatar
        //       variant="rounded"
        //       sx={{ width: 70, height: 70 }}
        //       src={row.images[0]}
        //     />
        //   );
        // },
      },
      {
        field: "createdAt",
        headerName: "Создан",
        headerAlign: "center",
        align: "center",
        width: 160,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "#",
        headerAlign: "center",
        align: "center",
        width: 30,

        sortable: false,
        getActions: ({ row }) => [
          <GridActionsCellItem
            key={1}
            icon={<EditIcon color="success" />}
            sx={{ padding: "2px 6px" }}
            label={t("buttons.edit")}
            showInMenu
            onClick={() => edit("routes", row.id)}
          />,
          <GridActionsCellItem
            key={2}
            icon={<CloseOutlinedIcon color="error" />}
            sx={{ padding: "2px 6px" }}
            label={t("buttons.delete")}
            showInMenu
            onClick={() => {
              mutateDelete({
                resource: "routes",
                id: row.id,
                mutationMode: "undoable",
              });
            }}
          />,
        ],
      },
    ],
    [t]
  );

  const { register, handleSubmit } = useForm<
    IRoute,
    HttpError,
    IUserFilterVariables
  >({
    defaultValues: {
      q: getDefaultFilter("q", filters, "eq"),
    },
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <Card sx={{ paddingX: { xs: 2, md: 0 } }}>
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
                label={t("users.filter.search.label")}
                placeholder={t("users.filter.search.placeholder")}
                margin="normal"
                fullWidth
                autoFocus
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <Button size="small" type="submit" variant="contained">
                {t("orders.filter.submit")}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={12}>
        <List cardProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}>
          <DataGrid
            {...dataGridProps}
            columns={columns}
            filterModel={undefined}
            autoHeight
            rowHeight={80}
            onRowClick={({ id }) => {
              show("routes", id);
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
      </Grid>
    </Grid>
  );
};
