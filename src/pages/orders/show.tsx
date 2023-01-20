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
} from "@pankod/refine-mui";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

import { InfoBox, OrderStatus } from "components";

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
  useEffect(() => {
    console.log(record);
  }, [record]);

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
                  minWidth: "280px",
                }}
              >
                <Typography variant="body1">Маршрут: </Typography>
                <RouteName status={record?.route.route} />
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
                <Typography variant="body1">Статус: </Typography>{" "}
                <OrderStatus status={record?.status.text} />
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
                {record?.boat.name}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* user */}
        <Grid item xs={12} lg={4.5}>
          <Stack
            direction="column"
            flexWrap="wrap"
            justifyContent={isSmallOrLess ? "center" : "space-between"}
            alignItems="center"
          >
            {" "}
            <Avatar
              alt={record?.user.name}
              src={record?.user.avatar}
              sx={{ width: 240, height: 240 }}
              variant="rounded"
            />
            <Stack
              direction={isSmallOrLess ? "column" : "row"}
              alignItems={isSmallOrLess ? "center" : "flex-start"}
              textAlign={isSmallOrLess ? "center" : "left"}
              gap={2}
            >
              <Box>
                <Typography variant="h4">ГОСТЬ</Typography>
                <Typography variant="h5">{record?.user.name}</Typography>
              </Box>
            </Stack>
            <Stack
              direction="column"
              gap={2}
              padding={1}
              flexWrap="wrap"
              justifyContent="center"
            >
              <InfoBox
                text={t("agents.agent.phone")}
                icon={<PhoneIphoneIcon sx={{ fontSize: 36 }} />}
                value={record?.user.phone}
              />
              <InfoBox
                text={t("agents.agent.email")}
                icon={<EmailIcon sx={{ fontSize: 36 }} />}
                value={record?.user.email}
              />
            </Stack>
          </Stack>
        </Grid>
        {/* agent */}
        <Grid item xs={12} lg={4.5}>
          <Stack
            direction="column"
            flexWrap="wrap"
            justifyContent={isSmallOrLess ? "center" : "space-between"}
            alignItems="center"
          >
            <Avatar
              alt={record?.agent.name}
              src={record?.agent.avatar}
              sx={{ width: 240, height: 240 }}
              variant="rounded"
            />
            <Stack
              direction="column"
              alignItems="center"
              textAlign="center"
              gap={2}
            >
              <Box>
                <Typography variant="h4">АГЕНТ</Typography>
                <Typography variant="h5">{record?.agent.name}</Typography>
              </Box>
            </Stack>
            <Stack
              direction="column"
              gap={2}
              padding={1}
              flexWrap="wrap"
              justifyContent="center"
            >
              <InfoBox
                text={t("agents.agent.phone")}
                icon={<PhoneIphoneIcon sx={{ fontSize: 36 }} />}
                value={record?.agent.phone}
              />
              <InfoBox
                text={t("agents.agent.email")}
                icon={<EmailIcon sx={{ fontSize: 36 }} />}
                value={record?.agent.email}
              />
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Show>
  );
};
