import React from "react";
import { useDelete, useNavigation, useTranslate } from "@pankod/refine-core";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  useDataGrid,
} from "@pankod/refine-mui";
import EditIcon from "@mui/icons-material/Edit";
import { IOrder } from "interfaces";
import { RouteName } from "components/routeName";
import { OrderStatus } from "components/orderStatus";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export const RecentOrders: React.FC = () => {
  const t = useTranslate();
  const { show, edit } = useNavigation();
  const { mutate: mutateDelete } = useDelete();
  const { dataGridProps } = useDataGrid<IOrder>({
    resource: "orders",
    initialSorter: [
      {
        field: "createdAt",
        order: "desc",
      },
    ],
    initialPageSize: 4,
    syncWithLocation: true,
  });

  const columns = React.useMemo<GridColumns<IOrder>>(
    () => [
      {
        field: "id",
        headerName: t("orders.fields.orderNumber"),
        description: t("orders.fields.orderNumber"),
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 40,
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
        minWidth: 160,
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
        minWidth: 160,
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
        headerName: t("orders.fields.user"),
        valueGetter: ({ row }) => row.user.name,
        flex: 1,
        minWidth: 200,
        sortable: false,
      },

      {
        field: "actions",
        type: "actions",
        headerName: "#",
        flex: 1,
        minWidth: 20,
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

  return (
    <DataGrid
      {...dataGridProps}
      columns={columns}
      autoHeight
      headerHeight={0}
      rowHeight={80}
      onRowClick={({ id }) => {
        show("orders", id);
      }}
      rowsPerPageOptions={[4]}
      sx={{
        paddingX: { xs: 3 },
        border: "none",
      }}
    />
  );
};
