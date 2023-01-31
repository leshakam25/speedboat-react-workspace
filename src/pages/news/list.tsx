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
import { INews, IUserFilterVariables } from "interfaces";

export const NewsList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { mutate: mutateDelete } = useDelete();
  const { edit, show } = useNavigation();

  const { dataGridProps, search, filters } = useDataGrid<
    INews,
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

  const columns = React.useMemo<GridColumns<INews>>(
    () => [
      {
        field: "image",
        headerName: "Изображение",
        headerAlign: "center",
        align: "center",
        width: 130,
        renderCell: function render({ row }) {
          return (
            <Avatar
              variant="rounded"
              sx={{ width: 120, height: 120 }}
              src={row.image}
            />
          );
        },
      },
      {
        field: "title",
        headerName: "Заголовок",
        headerAlign: "center",
        align: "center",
        width: 200,
      },
      {
        field: "text",
        headerName: "Текст",
        headerAlign: "center",
        flex: 1,
        align: "center",
        width: 300,
      },
      {
        field: "createdAt",
        headerName: "Создано",
        headerAlign: "center",
        align: "center",
        width: 160,
      },
      {
        field: "author",
        headerName: "Автор",
        headerAlign: "center",
        align: "center",
        width: 180,
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
            onClick={() => edit("news", row.id)}
          />,
          <GridActionsCellItem
            key={2}
            icon={<CloseOutlinedIcon color="error" />}
            sx={{ padding: "2px 6px" }}
            label={t("buttons.delete")}
            showInMenu
            onClick={() => {
              mutateDelete({
                resource: "news",
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
    INews,
    HttpError,
    IUserFilterVariables
  >({
    defaultValues: {
      q: getDefaultFilter("q", filters, "eq"),
    },
  });

  return (
    <Grid container spacing={2}>
      {" "}
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
                placeholder="Поиск новостей"
                fullWidth
                autoFocus
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
                Поиск
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={12}>
        <List
          title="Новости"
          cardProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}
        >
          <DataGrid
            {...dataGridProps}
            columns={columns}
            filterModel={undefined}
            autoHeight
            rowHeight={130}
            onRowClick={({ id }) => {
              show("news", id);
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
