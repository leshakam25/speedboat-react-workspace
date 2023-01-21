import React, { useEffect } from "react";
import {
  IResourceComponentsProps,
  useNavigation,
  useShow,
  useTranslate,
  useUpdate,
} from "@pankod/refine-core";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Grid,
  Show,
  FormControl,
  FormLabel,
  TextField,
} from "@pankod/refine-mui";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

import {
  InfoBox,
  // , OrderStatus
} from "components";

import { IOrder, IOrderStatus } from "interfaces";
import { RouteName } from "components/routeName";

export const OrderShow: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const { queryResult } = useShow<IOrder>();
  const record = queryResult.data?.data;

  const { goBack } = useNavigation();
  const { mutate } = useUpdate();

  const theme = useTheme();

  const isSmallOrLess = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Show>
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
                  <Typography variant="h6">
                    {t("orders.fields.orderNumber")}
                  </Typography>
                  <Typography variant="h5">{`${record?.id ?? ""}`}</Typography>
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
                {/* <RouteName status={record?.route.route} /> */}
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
                {/* {record?.status} */}
                {/* <OrderStatus status={record?.status.text} /> */}
                {record?.status}
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
