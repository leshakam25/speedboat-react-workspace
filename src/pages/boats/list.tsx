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
        field: "queue",
        headerName: "Очередь",
        minWidth: 40,
      },
      {
        field: "name",
        headerName: "Имя лодки",
        minWidth: 140,
      },

      {
        field: "capacity",
        headerName: "Вместимость",
        minWidth: 120,
      },

      {
        field: "status",
        headerName: "Статус",
        minWidth: 80,
      },
      {
        field: "isActive",
        headerName: "Активность",
        minWidth: 40,
      },
      {
        field: "createdAt",
        headerName: "Создан",
        minWidth: 140,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Действия",
        minWidth: 10,
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
      <Grid item xs={12} lg={3}>
        <Card sx={{ paddingX: { xs: 2, md: 0 } }}>
          <CardHeader title={t("users.filter.title")} />
          <CardContent sx={{ pt: 0 }}>
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column" }}
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
              <br />
              <Button type="submit" variant="contained">
                Поиск
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={9}>
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
