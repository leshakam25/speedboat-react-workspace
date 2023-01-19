import React from "react";
import {
  Grid,
  GridColumns,
  Show,
  Stack,
  useDataGrid,
} from "@pankod/refine-mui";
import {
  HttpError,
  IResourceComponentsProps,
  useShow,
  useTranslate,
} from "@pankod/refine-core";
import { IUser, IUserFilterVariables } from "interfaces";

const UserInfoText: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent={{
      sm: "center",
      lg: "flex-start",
    }}
    gap={1}
  >
    {children}
  </Stack>
);

export const NewsShow: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const { queryResult } = useShow<IUser>();
  const user = queryResult.data?.data;

  const { dataGridProps } = useDataGrid<IUser, HttpError, IUserFilterVariables>(
    {
      resource: "users",
      initialSorter: [
        {
          field: "createdAt",
          order: "desc",
        },
      ],
      permanentFilter: [
        {
          field: "user.id",
          operator: "eq",
          value: user?.id,
        },
      ],
      initialPageSize: 4,
      queryOptions: {
        enabled: user !== undefined,
      },
      syncWithLocation: false,
    }
  );

  const columns = React.useMemo<GridColumns<IUser>>(
    () => [
      {
        field: "orderNumber",
        headerName: t("orders.fields.orderNumber"),
        width: 100,
      },

      {
        field: "route",
        headerName: t("orders.fields.route"),
        sortable: false,
        width: 150,
      },
      {
        field: "status",
        headerName: t("orders.fields.status"),
        sortable: false,
        width: 150,
      },
      {
        field: "createdAt",
        headerName: t("orders.fields.createdAt"),
      },
    ],
    [t]
  );

  return (
    <Show>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3}></Grid>
        {/* <Grid item xs={12} lg={4}>
          <Stack direction="column" spacing={2}>
            <List
              cardHeaderProps={{ title: t("orders.orders") }}
              cardProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}
            >
              <DataGrid
                {...dataGridProps}
                columns={columns}
                autoHeight
                rowsPerPageOptions={[4, 10, 20, 100]}
              />
            </List>
          </Stack>
        </Grid> */}
      </Grid>
    </Show>
  );
};
