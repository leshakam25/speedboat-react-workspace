import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  IResourceComponentsProps,
  BaseRecord,
  CrudFilters,
  HttpError,
  useNavigation,
  useExport,
  getDefaultFilter,
  useDelete,
} from "@pankod/refine-core";
import {
  useDataGrid,
  DataGrid,
  Grid,
  Box,
  TextField,
  Button,
  GridColumns,
  CardContent,
  Card,
  CardHeader,
  List,
  ExportButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  GridActionsCellItem,
} from "@pankod/refine-mui";
import { Controller, useForm } from "@pankod/refine-react-hook-form";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { OrderStatus } from "components";
import { IOrder, IOrderFilterVariables } from "interfaces";

export const OrderList: React.FC<IResourceComponentsProps> = () => {
  const { edit } = useNavigation();
  const { mutate: mutateDelete } = useDelete();
  const { dataGridProps, search, filters, sorter } = useDataGrid<
    IOrder,
    HttpError,
    IOrderFilterVariables
  >({
    initialPageSize: 10,
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { q, status, route } = params;

      filters.push({
        field: "q",
        operator: "eq",
        value: q !== "" ? q : undefined,
      });

      filters.push({
        field: "status",
        operator: "in",
        value: (status ?? []).length > 0 ? status : undefined,
      });
      filters.push({
        field: "route",
        operator: "in",
        value: (route ?? []).length > 0 ? route : undefined,
      });

      return filters;
    },
  });

  const columns = React.useMemo<GridColumns<IOrder>>(
    () => [
      {
        field: "id",
        headerName: "№",
        description: "№",
        headerAlign: "center",
        align: "center",
        width: 40,
      },
      {
        field: "status",
        headerName: "Статус",
        headerAlign: "center",
        align: "center",
        renderCell: function render({ row }) {
          return <OrderStatus status={row.status} />;
        },
        width: 180,
      },
      {
        field: "route",
        headerName: "Маршрут",
        // valueGetter: ({ row }) => row.boat.name,
        headerAlign: "center",
        align: "center",
        width: 100,
      },
      {
        field: "boat",
        headerName: "Лодка",
        // valueGetter: ({ row }) => row.boat.name,
        headerAlign: "center",
        align: "center",
        width: 100,
      },
      {
        field: "date",
        headerName: "Дата",
        headerAlign: "center",
        align: "center",
        width: 160,
      },
      {
        field: "user",
        headerName: "Пользователь",
        // valueGetter: ({ row }) => row.user.name,
        headerAlign: "center",
        align: "center",
        width: 200,
      },
      {
        field: "agent",
        headerName: "Агент",
        // valueGetter: ({ row }) => row.agent.name,
        headerAlign: "center",
        align: "center",
        width: 200,
      },
      {
        field: "desc",
        headerName: "Комментарий",
        // valueGetter: ({ row }) => row.agent.name,
        headerAlign: "center",
        align: "center",
        width: 200,
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
            label="Редактировать"
            showInMenu
            onClick={() => edit("orders", row.id)}
          />,
          <GridActionsCellItem
            key={2}
            icon={<CloseOutlinedIcon color="error" />}
            sx={{ padding: "2px 6px" }}
            label="Удалить"
            showInMenu
            onClick={() => {
              mutateDelete({
                resource: "orders",
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

  const { show, create } = useNavigation();

  const { isLoading, triggerExport } = useExport<IOrder>({
    sorter,
    filters,
    pageSize: 50,
    maxItemCount: 50,
    mapData: (item) => {
      return {
        orderNumber: item.id,
        user: item.user,
        route: item.route,
        status: item.status,
        agent: item.agent,
        createdAt: item.createdAt,
      };
    },
  });

  const { register, handleSubmit, control } = useForm<
    BaseRecord,
    HttpError,
    IOrderFilterVariables
  >({
    defaultValues: {
      q: getDefaultFilter("q", filters, "eq"),
    },
  });

  return (
    <Grid container spacing={2}>
      {/* FILTER */}
      <Grid item xs={12} lg={12}>
        {" "}
        <Card sx={{ paddingX: { xs: 2, md: 0 } }}>
          <CardHeader title="Поиск" />
          <CardContent sx={{ pt: 0 }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "row",
                wrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              autoComplete="off"
              onSubmit={handleSubmit(search)}
            >
              <TextField
                {...register("q")}
                label="Поиск"
                placeholder="Поиск по заказам"
                margin="normal"
                autoFocus
                size="small"
                fullWidth
              />
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <FormControl
                    margin="normal"
                    size="small"
                    sx={{ width: "100%" }}
                  >
                    <InputLabel id="status-select">Статус оплаты</InputLabel>
                    <Select
                      {...field}
                      labelId="status-select"
                      label="Статус оплаты"
                    >
                      <MenuItem value="">
                        <br />
                      </MenuItem>
                      <MenuItem value="payment is expected">
                        Ожидается оплата{" "}
                      </MenuItem>
                      <MenuItem value="paid">Оплачено </MenuItem>
                      <MenuItem value="done">Выполнено </MenuItem>
                      <MenuItem value="cancelled">Отмененно </MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="route"
                render={({ field }) => (
                  <FormControl
                    margin="normal"
                    size="small"
                    sx={{ width: "100%" }}
                  >
                    <InputLabel id="route-select">Выберите маршрут </InputLabel>
                    <Select {...field} labelId="route-select" label="Маршрут">
                      <MenuItem value="">
                        <br />
                      </MenuItem>
                      <MenuItem value="0">Валаам</MenuItem>
                      <MenuItem value="1">Шхеры</MenuItem>
                      <MenuItem value="2">Валаам и Шхеры</MenuItem>
                      <MenuItem value="3">Зимняя</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <br />
              <Button size="small" type="submit" variant="contained">
                Поиск
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      {/* TABLE */}
      <Grid item xs={12} lg={12}>
        <List
          wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}
          headerProps={{
            action: (
              <>
                <Button
                  onClick={(): void => create("orders")}
                  variant="contained"
                >
                  Создать
                </Button>
                <ExportButton onClick={triggerExport} loading={isLoading} />
              </>
            ),
          }}
        >
          <DataGrid
            {...dataGridProps}
            columns={columns}
            filterModel={undefined}
            autoHeight
            rowHeight={80}
            onRowClick={({ id }) => {
              show("orders", id);
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
