import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  IResourceComponentsProps,
  BaseRecord,
  CrudFilters,
  HttpError,
  useTranslate,
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
import { RouteName } from "components/routeName";

export const OrderList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
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
        field: "status.text",
        operator: "in",
        value: (status ?? []).length > 0 ? status : undefined,
      });
      filters.push({
        field: "route.route",
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
        description: t("orders.fields.orderNumber"),
        headerAlign: "center",
        align: "center",
        flex: 1,
        width: 16,
      },
      {
        field: "status.text",
        headerName: t("orders.fields.status"),
        headerAlign: "center",
        align: "center",
        renderCell: function render({ row }) {
          return <OrderStatus status={row.status.text} />;
        },
        flex: 1,
        minWidth: 180,
      },
      {
        field: "route.route",
        headerName: t("orders.fields.route"),
        headerAlign: "center",
        align: "center",
        renderCell: function render({ row }) {
          return <RouteName status={row.route.route} />;
        },
        flex: 1,
        minWidth: 180,
      },
      {
        field: "boat",
        headerName: "Лодка",
        valueGetter: ({ row }) => row.boat.name,
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 150,
      },
      {
        field: "date",
        headerName: t("orders.fields.date"),
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 150,
      },
      {
        field: "user",
        headerName: "Пользователь",
        valueGetter: ({ row }) => row.user.name,
        flex: 1,
        minWidth: 200,
        sortable: false,
      },
      {
        field: "agent",
        headerName: "Агент",
        valueGetter: ({ row }) => row.agent.name,
        flex: 1,
        minWidth: 200,
        sortable: false,
      },

      {
        field: "createdAt",
        headerName: t("orders.fields.createdAt"),
        flex: 1,
        minWidth: 180,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "#",
        flex: 1,
        minWidth: 40,
        sortable: false,
        getActions: ({ row }) => [
          <GridActionsCellItem
            key={1}
            icon={<EditIcon color="success" />}
            sx={{ padding: "2px 6px" }}
            label={t("buttons.edit")}
            showInMenu
            onClick={() => edit("orders", row.id)}
          />,
          <GridActionsCellItem
            key={2}
            icon={<CloseOutlinedIcon color="error" />}
            sx={{ padding: "2px 6px" }}
            label={t("buttons.delete")}
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
    [t]
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
        user: item.user.id,
        route: item.route.route,
        status: item.status.text,
        agent: item.agent.name,
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
                label={t("orders.filter.search.label")}
                placeholder={t("orders.filter.search.placeholder")}
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
                    <InputLabel id="status-select">
                      {t("orders.fields.status")}
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="status-select"
                      label={t("orders.fields.status")}
                    >
                      <MenuItem value="">
                        <br />
                      </MenuItem>
                      <MenuItem value="payment is expected">
                        {t("enum.orderStatuses.payment is expected")}
                      </MenuItem>
                      <MenuItem value="paid">
                        {t("enum.orderStatuses.paid")}
                      </MenuItem>
                      <MenuItem value="done">
                        {t("enum.orderStatuses.done")}
                      </MenuItem>
                      <MenuItem value="cancelled">
                        {t("enum.orderStatuses.cancelled")}
                      </MenuItem>
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
                    <InputLabel id="route-select">
                      {t("orders.fields.route")}
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="route-select"
                      label={t("orders.fields.route")}
                    >
                      <MenuItem value="">
                        <br />
                      </MenuItem>
                      <MenuItem value="valaam">
                        {t("enum.routes.valaam")}
                      </MenuItem>
                      <MenuItem value="shchery">
                        {t("enum.routes.shchery")}
                      </MenuItem>
                      <MenuItem value="valaam and shchery">
                        {t("enum.routes.valaam and shchery")}
                      </MenuItem>
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
