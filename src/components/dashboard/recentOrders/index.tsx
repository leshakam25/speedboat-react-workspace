import React from "react";
import { useDelete, useNavigation, useTranslate } from "@pankod/refine-core";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  List,
  useDataGrid,
} from "@pankod/refine-mui";
import EditIcon from "@mui/icons-material/Edit";
import { IOrder } from "interfaces";
// import { RouteName } from "components/routeName";
// import { OrderStatus } from "components/orderStatus";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { OrderStatus } from "components/orderStatus";
import { RouteName } from "components/routeName";

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

  return (
    <DataGrid
      {...dataGridProps}
      columns={columns}
      autoHeight
      rowHeight={80}
      onRowClick={({ id }) => {
        show("orders", id);
      }}
      rowsPerPageOptions={[4]}
      sx={{
        ...dataGridProps.sx,
        "& .MuiDataGrid-row": {
          cursor: "pointer",
        },
      }}
    />
  );
};
