import React, { useEffect, useState } from "react";
import { useDelete, useNavigation, useTranslate, useResource } from "@pankod/refine-core";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRenderCellParams,
  List,
  useDataGrid,
} from "@pankod/refine-mui";
import EditIcon from "@mui/icons-material/Edit";
import { IAgent, IBoat, IOrder, IRoute } from "interfaces";
// import { RouteName } from "components/routeName";
// import { OrderStatus } from "components/orderStatus";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { OrderStatus } from "components/orderStatus";
import { RouteName } from "components/routeName";
import { useAppDispatch, useAppSelector } from "redux-hooks";
import { AppDispatch } from "store";
import { setBoats } from "features/Dictionary/dictionarySlice";
import { fetchAllAgents, fetchAllBoats, fetchAllRoutes } from "features/AsyncDictionary/dictionatyAsyncActionis";

// type AsyncFunction <string,O> = (...args:A) => Promise<O> 
// type SearchFn = AsyncFunction<[string], string>

interface IDataSet {
  routes: IRoute[] ;
  boats: IBoat[];
  agents: IAgent[] ;  
}

export const RecentOrders: React.FC = () => {
<<<<<<< HEAD
=======
  const t = useTranslate();
  const dispatch:AppDispatch=useAppDispatch()
>>>>>>> 0f040814afd9148d3562947f145ac67b18120b7a
  const { show, edit } = useNavigation();
  const { resources } = useResource()
  const routesResourse = resources.find((el)=>el.name==="routes")
  const [dataset, setDataset] = useState<IDataSet>({routes:[],agents:[],boats:[]})
  const stateBoats = useAppSelector((state)=>state.asyncDictionary.boats)
  const stateAgents = useAppSelector((state)=>state.asyncDictionary.agents)
  const stateRoutes = useAppSelector((state)=>state.asyncDictionary.routes)
  const [boats, setBoats] = useState<IBoat[]>(stateBoats)
  const [routes, setRoutes] = useState<IRoute[]>(stateRoutes)
  const [agents, setAgents] = useState<IAgent[]>(stateAgents)
  const [isFulfilled, setIsFulfilled] = useState(false)
 
  useEffect(() => {
    if(routes.length>0 && agents.length>0 && boats.length>0) setIsFulfilled(true)
  }, [routes, agents, boats])
  useEffect(() => {
    if (stateBoats.length>0) setBoats(stateBoats)
  }, [stateBoats])
  useEffect(() => {
    if (stateAgents.length>0) setAgents(stateAgents)
  }, [stateAgents])

  useEffect(() => {
    if (routes.length===0) setRoutes(stateRoutes)
  }, [stateRoutes])

  
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
        renderCell: function render({ row }) {
          const route = routes.find(route=>route.id===row.route)        
              if (typeof route==='object') {
                return<>{route.name}</>
              } else {
                return<>{"--"}</>
              } 
        },
      },
      {
        field: "boat",
        headerName: "Лодка",
        // valueGetter: ({ row }) => row.boat.name,
        headerAlign: "center",
        align: "center",
        width: 100,
        renderCell: function render({ row }) {
              const boat = boats.find(boat=>boat.id===row.boat)        
              if (typeof boat==='object') {
                return<>{boat.name}</>
              } else {
                return<>{"--"}</>
              } 
        },
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
        renderCell: function render(params: GridRenderCellParams<IAgent>) {
              const agent = agents.find(ag=>ag.id===params.row.agent)        
              if (typeof agent==='object') {
                return<>{agent.name}</>
              } else {
                return<>{"--"}</>
              }
        },
      },
      // {
      //   field: "desc",
      //   headerName: "Комментарий",
      //   // valueGetter: ({ row }) => row.agent.name,
      //   headerAlign: "center",
      //   align: "center",
      //   width: 200,
      //   flex: 1,
      // },
<<<<<<< HEAD
      // {
      //   field: "createdAt",
      //   headerName: "Создан",
      //   headerAlign: "center",
      //   align: "center",
      //   width: 160,
      // },
=======
      {
        field: "createdAt",
        headerName: "Создан",
        headerAlign: "center",
        align: "center",
        width: 160,
      },
>>>>>>> 0f040814afd9148d3562947f145ac67b18120b7a
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
    [routes, agents, boats]
  );
if (isFulfilled) {
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
} else {
  return <><h1>Загружаем данные</h1></>
}
  
};
