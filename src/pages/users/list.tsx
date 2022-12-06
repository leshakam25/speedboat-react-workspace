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
  BooleanField,
  DateField,
  ShowButton,
  Button,
  TextField,
  Box,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardHeader,
  Card,
  CardContent,
  List,
  GridActionsCellItem,
} from "@pankod/refine-mui";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EditIcon from "@mui/icons-material/Edit";

import { Controller, useForm } from "@pankod/refine-react-hook-form";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { IUser, IUserFilterVariables } from "interfacesNew";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { mutate: mutateDelete } = useDelete();
  const { edit } = useNavigation();

  const { dataGridProps, search, filters } = useDataGrid<
    IUser,
    HttpError,
    IUserFilterVariables
  >({
    initialPageSize: 10,
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { q, gender, isActive } = params;

      filters.push({
        field: "q",
        operator: "eq",
        value: q !== "" ? q : undefined,
      });

      // filters.push({
      //     field: "gender",
      //     operator: "eq",
      //     value: gender !== "" ? gender : undefined,
      // });

      // filters.push({
      //     field: "isActive",
      //     operator: "eq",
      //     value: isActive !== "" ? isActive : undefined,
      // });

      return filters;
    },
  });

  const columns = React.useMemo<GridColumns<IUser>>(
    () => [
      {
        field: "avatar",
        headerName: t("users.fields.avatar.label"),
        renderCell: function render({ row }) {
          return <Avatar src={row.avatar} />;
        },
        maxWidth: 60,
      },
      {
        field: "phone",
        headerName: t("users.fields.phone"),
        maxWidth: 170,
      },

      {
        field: "name",
        headerName: t("users.fields.name"),
        maxWidth: 240,
      },
      {
        field: "email",
        headerName: t("users.fields.email"),
        maxWidth: 200,
      },

      {
        field: "createdAt",
        headerName: t("users.fields.createdAt"),
        renderCell: function render({ row }) {
          return <DateField value={row.createdAt} format="LLL" />;
        },
        maxWidth: 160,
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
            onClick={() => edit("users", row.id)}

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
            // onClick={() => {
            //   mutateDelete({
            //     resource: "orders",
            //     id: row.id,
            //     mutationMode: "undoable",
            //   });
            // }}
          />,
        ],
      },
    ],
    [t]
  );

  const { register, handleSubmit, control } = useForm<
    IUser,
    HttpError,
    IUserFilterVariables
  >({
    defaultValues: {
      q: getDefaultFilter("q", filters, "eq"),
      gender: getDefaultFilter("gender", filters, "eq") || "",
      isActive: getDefaultFilter("isActive", filters, "eq") || "",
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

              <Controller
                control={control}
                name="isActive"
                render={({ field }) => (
                  <FormControl margin="normal" size="small">
                    <InputLabel id="isActive-select">
                      {t("users.filter.isActive.label")}
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="isActive-select"
                      label={t("users.filter.isActive.label")}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="true">
                        {t("users.filter.isActive.true")}
                      </MenuItem>
                      <MenuItem value="false">
                        {t("users.filter.isActive.false")}
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
      <Grid item xs={12} lg={9}>
        <List cardProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}>
          <DataGrid
            {...dataGridProps}
            columns={columns}
            filterModel={undefined}
            autoHeight
            rowsPerPageOptions={[10, 20, 50, 100]}
          />
        </List>
      </Grid>
    </Grid>
  );
};
