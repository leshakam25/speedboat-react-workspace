import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  IResourceComponentsProps,
  BaseRecord,
  CrudFilters,
  HttpError,
  useTranslate,
  useNavigation,
  useUpdate,
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
  DateField,
  GridColumns,
  useAutocomplete,
  Autocomplete,
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
import SettingsIcon from "@mui/icons-material/Settings";
import { Controller, useForm } from "@pankod/refine-react-hook-form";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EmailIcon from "@mui/icons-material/Email";
import { CustomTooltip, OrderStatus } from "components";
import { IOrder, IOrderFilterVariables } from "interfacesNew";
import { RouteName } from "components/routeName";
import { OrderCreate } from "./create";
import { RecentOrders } from "components/dashboard";

export const OrderList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { mutate } = useUpdate();
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
        field: "orderNumber",
        headerName: t("orders.fields.orderNumber"),
        description: t("orders.fields.orderNumber"),
        headerAlign: "center",
        align: "center",
        flex: 1,
        maxWidth: 100,
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
        maxWidth: 180,
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
        maxWidth: 180,
      },
      {
        field: "date",
        headerName: t("orders.fields.date"),
        headerAlign: "center",
        align: "center",
        valueGetter: ({ row }) => row.date,
        flex: 1,
        maxWidth: 150,
      },
      {
        field: "user",
        headerName: t("orders.fields.user"),
        valueGetter: ({ row }) => row.user.name,
        flex: 1,
        maxWidth: 200,
        sortable: false,
      },
      {
        field: "agent.phone",
        headerName: t("orders.fields.phone"),
        headerAlign: "center",
        align: "center",
        valueGetter: ({ row }) => row.agent.phone,
        flex: 1,
        maxWidth: 150,
      },

      {
        field: "createdAt",
        headerName: t("orders.fields.createdAt"),
        flex: 1,
        maxWidth: 180,
        renderCell: function render({ row }) {
          return (
            <DateField
              value={row.createdAt}
              format="LL"
              sx={{ fontSize: "14px" }}
            />
          );
        },
      },
      {
        field: "actions",
        type: "actions",
        headerName: "#",
        flex: 1,
        maxWidth: 40,
        sortable: false,
        getActions: ({ row }) => [
          <GridActionsCellItem
            key={1}
            icon={<EditIcon color="success" />}
            sx={{ padding: "2px 6px" }}
            label={t("buttons.edit")}
            showInMenu
            onClick={() => edit("orders", row.id)}

            // onClick={() => {
            //   mutate({
            //     resource: "orders",
            //     id,
            //     values: {
            //       status: {
            //         id: 2,
            //         text: "Ready",
            //       },
            //     },
            //   });
            // }}
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
            // onClick={() =>
            //   mutate({
            //     resource: "orders",
            //     id,
            //     values: {
            //       status: {
            //         id: 5,
            //         text: "Cancelled",
            //       },
            //     },
            //   })
            // }
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
        id: item.id,
        user: item.user,
        orderNumber: item.orderNumber,
        route: item.route.route,
        status: item.status.text,
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
      <Grid item xs={12} lg={3}>
        {" "}
        <Card sx={{ paddingX: { xs: 2, md: 0 } }}>
          <CardHeader title={t("orders.filter.title")} />
          <CardContent sx={{ pt: 0 }}>
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column" }}
              autoComplete="off"
              onSubmit={handleSubmit(search)}
            >
              <TextField
                {...register("q")}
                label={t("orders.filter.search.label")}
                placeholder={t("orders.filter.search.placeholder")}
                margin="normal"
                fullWidth
                autoFocus
                size="small"
              />
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <FormControl margin="normal" size="small">
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
                  <FormControl margin="normal" size="small">
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
              <Button type="submit" variant="contained">
                {t("orders.filter.submit")}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      {/* TABLE */}
      <Grid item xs={12} lg={9}>
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
