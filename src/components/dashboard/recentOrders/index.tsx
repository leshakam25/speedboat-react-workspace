import React from "react";
import { useNavigation, useTranslate, useUpdate } from "@pankod/refine-core";
import {
  Avatar,
  Button,
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  NumberField,
  Stack,
  Typography,
  useDataGrid,
} from "@pankod/refine-mui";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";

import { OrderStatus } from "components/orderStatus";
import { IOrder } from "interfacesOld";

export const RecentOrders: React.FC = () => {
  const t = useTranslate();
  const { show } = useNavigation();
  const { mutate } = useUpdate();

  const { dataGridProps } = useDataGrid<IOrder>({
    resource: "orders",
    initialSorter: [
      {
        field: "createdAt",
        order: "desc",
      },
    ],
    initialPageSize: 4,
    permanentFilter: [
      {
        field: "status.text",
        operator: "eq",
        value: "Pending",
      },
    ],
    syncWithLocation: true,
  });

  const columns = React.useMemo<GridColumns<IOrder>>(
    () => [
      {
        field: "orderNumber",
        renderCell: function render({ row }) {
          return (
            <Stack
              spacing={1}
              sx={{
                whiteSpace: "pre-wrap",
                height: "100%",
                mt: 2,
              }}
            >
              <Typography sx={{ fontWeight: 800 }}>
                ${row.orderNumber}
              </Typography>
            </Stack>
          );
        },
        flex: 1,
        minWidth: 100,
      },
      // {
      //   field: "amount",
      //   renderCell: function render({ row }) {
      //     return (
      //       <NumberField
      //         options={{
      //           currency: "USD",
      //           style: "currency",
      //           notation: "standard",
      //         }}
      //         sx={{ fontWeight: 800 }}
      //         value={row.amount / 100}
      //       />
      //     );
      //   },
      //   align: "center",
      //   flex: 1,
      //   width: 80,
      // },

      {
        field: "actions",
        type: "actions",
        width: 80,
        getActions: ({ id }) => [
          <GridActionsCellItem
            key={1}
            icon={<CheckOutlined color="success" />}
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
            icon={<CloseOutlined color="error" />}
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

  return (
    <DataGrid
      {...dataGridProps}
      columns={columns}
      autoHeight
      headerHeight={0}
      rowHeight={200}
      rowsPerPageOptions={[4, 10, 25, 50, 100]}
      sx={{
        paddingX: { xs: 3 },
        border: "none",
      }}
    />
  );
};
