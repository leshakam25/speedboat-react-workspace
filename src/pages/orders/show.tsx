import React from "react";
import { IResourceComponentsProps, useShow } from "@pankod/refine-core";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  Grid,
  Show,
  DeleteButton,
  EditButton,
  ListButton,
  RefreshButton,
} from "@pankod/refine-mui";
import { usePermissions } from "@pankod/refine-core/";

import { IOrder } from "interfaces";
import { OrderStatus } from "components";

export const OrderShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IOrder>();
  const record = queryResult.data?.data;
  const { data: permissionsData } = usePermissions();

  return (
    <Show
      resource="orders"
      title={false}
      breadcrumb={false}
      headerButtons={
        permissionsData?.includes("admin") ? (
          <>
            <ListButton hideText={true} /> <RefreshButton hideText={true} />
            <EditButton hideText={true} /> <DeleteButton hideText={true} />
          </>
        ) : (
          <>
            <ListButton hideText={true} /> <RefreshButton hideText={true} />
          </>
        )
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3}>
          <Card sx={{ boxShadow: "none", border: "none" }}>
            <CardHeader
              sx={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
              }}
              title={
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h6">Номер заказа</Typography>
                  <Typography variant="h5">{`${record?.id}`}</Typography>
                </Stack>
              }
            />

            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  my: 1,
                  width: "100%",
                }}
              >
                <Typography variant="body1">Маршрут: </Typography>
                {record?.route}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  my: 1,
                }}
              >
                <Typography variant="body1">Дата: </Typography>
                {record?.date}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  my: 1,
                }}
              >
                <Typography variant="body1">Статус: </Typography>
                <OrderStatus status={record?.status} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  my: 1,
                }}
              >
                <Typography variant="body1">Создан: </Typography>
                {record?.createdAt}
              </Box>{" "}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  my: 1,
                }}
              >
                <Typography variant="body1">Лодка: </Typography>
                {record?.boat}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* user */}
        <Grid item xs={12} lg={2}>
          <Typography variant="h5">Гость: {record?.user}</Typography>
        </Grid>
        {/* agent */}
        <Grid item xs={12} lg={2}>
          <Typography variant="h5">Агент: {record?.agent}</Typography>
        </Grid>{" "}
        <Grid item xs={12} lg={5} spacing={2}>
          <Box>
            <Typography variant="h5">Описание: </Typography>
            <Typography variant="h6">{record?.desc} </Typography>
          </Box>
        </Grid>
      </Grid>
    </Show>
  );
};
