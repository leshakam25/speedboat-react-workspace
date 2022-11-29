import React from "react";
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
} from "@pankod/refine-core";
import {
  useDataGrid,
  DataGrid,
  Grid,
  Box,
  TextField,
  Button,
  NumberField,
  Typography,
  DateField,
  GridColumns,
  GridActionsCellItem,
  Stack,
  useAutocomplete,
  Autocomplete,
  CardContent,
  Card,
  CardHeader,
  List,
  ExportButton,
} from "@pankod/refine-mui";
import { Controller, useForm } from "@pankod/refine-react-hook-form";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { OrderStatus, CustomTooltip } from "components";
import { IOrder, IOrderFilterVariables } from "interfacesNew";
import { RouteName } from "components/routeName";

export const OrderList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { mutate } = useUpdate();

  const { dataGridProps, search, filters, sorter } = useDataGrid<
    IOrder,
    HttpError,
    IOrderFilterVariables
  >({
    initialPageSize: 10,
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { q, phone, user, status } = params;

      filters.push({
        field: "q",
        operator: "eq",
        value: q !== "" ? q : undefined,
      });

      filters.push({
        field: "phone",
        operator: "eq",
        value: (phone ?? [].length) > 0 ? phone : undefined,
      });

      filters.push({
        field: "user.id",
        operator: "eq",
        value: user,
      });

      filters.push({
        field: "status.text",
        operator: "in",
        value: (status ?? []).length > 0 ? status : undefined,
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
        minWidth: 50,
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
        minWidth: 100,
      },

      {
        field: "user",
        headerName: t("orders.fields.user"),
        valueGetter: ({ row }) => row.user.name,
        flex: 1,
        minWidth: 150,
        sortable: false,
      },
      {
        field: "route",
        headerName: t("orders.fields.route"),
        // renderCell: function render({ row }) {
        //   return <RouteName status={row.order.route} />;
        // },
        flex: 1,
        minWidth: 150,
        sortable: false,
      },
      {
        field: "createdAt",
        headerName: t("orders.fields.createdAt"),
        flex: 1,
        minWidth: 170,
        renderCell: function render({ row }) {
          return (
            <DateField
              value={row.createdAt}
              format="LLL"
              sx={{ fontSize: "14px" }}
            />
          );
        },
      },
      {
        field: "actions",
        type: "actions",
        headerName: t("table.actions"),
        flex: 1,
        minWidth: 100,
        sortable: false,
        getActions: ({ id }) => [
          <GridActionsCellItem
            key={1}
            icon={<CheckOutlinedIcon color="success" />}
            sx={{ padding: "2px 6px" }}
            label={t("buttons.accept")}
            showInMenu
            onClick={() => {
              mutate({
                resource: "orders",
                id,
                values: {
                  status: {
                    id: 2,
                    text: "Ready",
                  },
                },
              });
            }}
          />,
          <GridActionsCellItem
            key={2}
            icon={<CloseOutlinedIcon color="error" />}
            sx={{ padding: "2px 6px" }}
            label={t("buttons.reject")}
            showInMenu
            onClick={() =>
              mutate({
                resource: "orders",
                id,
                values: {
                  status: {
                    id: 5,
                    text: "Cancelled",
                  },
                },
              })
            }
          />,
        ],
      },
    ],
    [t]
  );

  const { show } = useNavigation();

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
        route: item.route,
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
      status: getDefaultFilter("status.text", filters, "in"),
      q: getDefaultFilter("q", filters, "eq"),
      phone: getDefaultFilter("phone", filters, "eq"),
      user: getDefaultFilter("user.id", filters, "eq"),
    },
  });

  const { autocompleteProps: storeAutocompleteProps } = useAutocomplete({
    resource: "stores",
    defaultValue: getDefaultFilter("store.id", filters, "eq"),
  });

  const { autocompleteProps: orderAutocompleteProps } = useAutocomplete({
    resource: "orderStatuses",
  });

  const { autocompleteProps: userAutocompleteProps } = useAutocomplete({
    resource: "users",
    defaultValue: getDefaultFilter("user.id", filters, "eq"),
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={3}>
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
                  <Autocomplete
                    {...orderAutocompleteProps}
                    {...field}
                    multiple
                    onChange={(_, value) => {
                      field.onChange(value.map((p) => p.text ?? p));
                    }}
                    getOptionLabel={(item) => {
                      return item?.text ? item.text : item;
                    }}
                    isOptionEqualToValue={(option, value) => {
                      return (
                        option.text === value || option.text === value.text
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("orders.filter.status.label")}
                        placeholder={t("orders.filter.status.placeholder")}
                        margin="normal"
                        variant="outlined"
                        size="small"
                      />
                    )}
                  />
                )}
              />
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <Autocomplete
                    {...storeAutocompleteProps}
                    {...field}
                    onChange={(_, value) => {
                      field.onChange(value?.id ?? value);
                    }}
                    getOptionLabel={(item) => {
                      return item.title
                        ? item.title
                        : storeAutocompleteProps?.options?.find(
                            (p) => p.id.toString() === item.toString()
                          )?.title ?? "";
                    }}
                    isOptionEqualToValue={(option, value) => {
                      return (
                        option.id.toString() === value.id?.toString() ||
                        option.id.toString() === value.toString()
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("orders.filter.phone")}
                        placeholder={t("orders.filter.phone")}
                        margin="normal"
                        variant="outlined"
                        size="small"
                      />
                    )}
                  />
                )}
              />
              <Controller
                control={control}
                name="user"
                render={({ field }) => (
                  <Autocomplete
                    {...userAutocompleteProps}
                    {...field}
                    onChange={(_, value) => {
                      field.onChange(value?.id ?? value);
                    }}
                    getOptionLabel={(item) => {
                      return item.fullName
                        ? item.fullName
                        : userAutocompleteProps?.options?.find(
                            (p) => p.id.toString() === item.toString()
                          )?.fullName ?? "";
                    }}
                    isOptionEqualToValue={(option, value) => {
                      return (
                        option.id.toString() === value.id?.toString() ||
                        option.id.toString() === value.toString()
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("orders.filter.user.label")}
                        placeholder={t("orders.filter.user.placeholder")}
                        margin="normal"
                        variant="outlined"
                        size="small"
                      />
                    )}
                  />
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
      <Grid item xs={12} lg={9}>
        <List
          cardProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}
          cardHeaderProps={{
            action: (
              <ExportButton onClick={triggerExport} loading={isLoading} />
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
