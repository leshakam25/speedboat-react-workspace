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
import { IBoat, IUserFilterVariables } from "interfaces";

export const BoatList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { mutate: mutateDelete } = useDelete();
  const { edit, show } = useNavigation();

  const { dataGridProps, search, filters } = useDataGrid<
    IBoat,
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

  const columns = React.useMemo<GridColumns<IBoat>>(
    () => [
      {
        field: "id",
        headerName: "№",
        headerAlign: "center",
        align: "center",
        width: 30,
      },
      {
        field: "image",
        headerName: "Фото",
        headerAlign: "center",
        align: "center",
        renderCell: function render({ row }) {
          return (
            <Avatar
              variant="rounded"
              sx={{ width: 70, height: 70 }}
              src={row.image}
            />
          );
        },
        width: 80,
      },
      {
        field: "name",
        headerName: "Имя лодки",
        headerAlign: "center",
        align: "center",
        width: 100,
      },
      {
        field: "priority",
        headerName: "Приоритет",
        headerAlign: "center",
        align: "center",
        width: 120,
      },
      {
        field: "capacity",
        headerName: "Вместимость",
        headerAlign: "center",
        align: "center",
        width: 120,
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
        width: 300,
        flex: 1,
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
        width: 30,
        sortable: false,
        getActions: ({ row }) => [
          <GridActionsCellItem
            key={1}
            icon={<EditIcon color="success" />}
            sx={{ padding: "2px 6px" }}
            label={t("buttons.edit")}
            showInMenu
            onClick={() => edit("boats", row.id)}
          />,
          <GridActionsCellItem
            key={2}
            icon={<CloseOutlinedIcon color="error" />}
            sx={{ padding: "2px 6px" }}
            label={t("buttons.delete")}
            showInMenu
            onClick={() => {
              mutateDelete({
                resource: "boats",
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
    IBoat,
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
                placeholder="Поиск по лодкам"
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
              <Button size="small" type="submit" variant="contained">
                Поиск
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
              show("boats", id);
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
