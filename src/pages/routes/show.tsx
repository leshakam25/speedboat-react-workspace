import React from "react";
import {
  Avatar,
  Box,
  Grid,
  Show,
  Stack,
  DeleteButton,
  EditButton,
  ListButton,
  RefreshButton,
  Typography,
} from "@pankod/refine-mui";
import { IResourceComponentsProps, useShow } from "@pankod/refine-core";
import { IRoute } from "interfaces";
import { usePermissions } from "@pankod/refine-core/";

export const RouteShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IRoute>();
  const route = queryResult.data?.data;
  const { data: permissionsData } = usePermissions();

  return (
    <Show
      title={<Typography variant="h6">Маршрут: {route?.name}</Typography>}
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
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-between",
        }}
      >
        <Grid item xs={12} lg={4}>
          <Box
            sx={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Название</Typography>
            <Typography variant="h6"> {route?.name}</Typography>{" "}
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Номер маршрута:</Typography>
            <Typography variant="h6">{route?.id}</Typography>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Протяженность</Typography>
            <Typography variant="h6">{route?.length}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Стоимость</Typography>
            <Typography variant="h6">{route?.price}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Активность</Typography>
            <Typography variant="h6"> {route?.isActive.toString()}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Время в пути</Typography>
            <Typography variant="h6">{route?.time}</Typography>{" "}
          </Box>
        </Grid>
        <Grid item xs={12} lg={7}>
          <Box
            sx={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Создан</Typography>
            <Typography variant="h6">{route?.createdAt}</Typography>
          </Box>
          <br />
          <Typography variant="h5">Описание</Typography>
          <Typography variant="h6" textAlign="justify">
            {route?.desc}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Stack
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            alignItems="center"
            gap={2}
          >
            {route?.images &&
              route?.images.map((el, id) => (
                <Avatar
                  key={id}
                  variant="rounded"
                  src={el}
                  sx={{ width: 240, height: 240 }}
                />
              ))}
          </Stack>
        </Grid>
      </Grid>
    </Show>
  );
};
