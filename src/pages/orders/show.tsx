import React from "react";
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
  IconButton,
  Stack,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
} from "@pankod/refine-mui";
// import dayjs from "dayjs";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { CourierInfoBox, OrderStatus } from "components";

import { IOrder, IOrderStatus } from "interfacesNew";
import { RouteName } from "components/routeName";
// import { useOrderCustomKbarActions } from "hooks";

export const OrderShow: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const { queryResult } = useShow<IOrder>();
  const record = queryResult.data?.data;
  // const canAcceptOrder = record?.status.text === "Pending";
  // const canRejectOrder =
  //   record?.status.text === "Pending" ||
  //   record?.status.text === "Ready" ||
  //   record?.status.text === "On The Way";

  const { goBack } = useNavigation();
  const { mutate } = useUpdate();

  const theme = useTheme();

  const isSmallOrLess = useMediaQuery(theme.breakpoints.down("sm"));

  // const columns = React.useMemo<GridColumns<IOrder>>(
  //   () => [
  //     {
  //       field: "orderNumber",
  //       headerName: t("orders.titles.list"),
  //       width: 300,
  //       renderCell: function render({ row }) {
  //         return (
  //           <Stack direction="row" spacing={4} alignItems="center">
  //             <Box>
  //               <Typography variant="body1" whiteSpace="break-spaces">
  //                 {row.orderNumber}
  //               </Typography>
  //             </Box>
  //           </Stack>
  //         );
  //       },
  //     },
  //   ],
  //   [t]
  // );

  // const CustomFooter = () => (
  //   <Stack direction="row" spacing={4} justifyContent="flex-end" p={1}>
  //     <Typography sx={{ color: "primary.main" }} fontWeight={700}>
  //       {t("orders.deliverables.mainTotal")}
  //     </Typography>asd
  //     <Typography>{record?.date}$</Typography>
  //   </Stack>
  // );

  // const handleMutate = (status: { id: number; text: string }) => {
  //   if (record) {
  //     mutate({
  //       resource: "orders",
  //       id: record.id.toString(),
  //       values: {
  //         status,
  //       },
  //     });
  //   }
  // };

  // useOrderCustomKbarActions(record);

  return (
    <Stack
      display="flex"
      direction="row"
      flexWrap="wrap"
      spacing={2}
      gap={2}
      justifyContent="center"
      alignItems="center"
    >
      <Card sx={{ minHeight: "432px" }}>
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
              spacing={1}
              justifyContent="left"
            >
              <Typography variant="h6">
                {t("orders.fields.orderNumber")}
              </Typography>
              <Typography variant="h5">
                {`${record?.orderNumber ?? ""}`}
              </Typography>
            </Stack>
          }
          avatar={
            <IconButton onClick={goBack}>
              <ArrowBackIcon />
            </IconButton>
          }
          // action={
          //   <Stack direction="row" spacing={2}>
          //     <Button
          //       disabled={!canAcceptOrder}
          //       variant="outlined"
          //       size="small"
          //       startIcon={<CheckOutlinedIcon />}
          //       onClick={() =>
          //         handleMutate({
          //           id: 2,
          //           text: "Ready",
          //         })
          //       }
          //     >
          //       {t("buttons.accept")}
          //     </Button>
          //     <Button
          //       disabled={!canRejectOrder}
          //       variant="outlined"
          //       size="small"
          //       color="error"
          //       startIcon={<CloseOutlinedIcon sx={{ bg: "red" }} />}
          //       onClick={() =>
          //         handleMutate({
          //           id: 5,
          //           text: "Cancelled",
          //         })
          //       }
          //     >
          //       {t("buttons.reject")}
          //     </Button>
          //   </Stack>
          // }
        />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              my: 1,
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
          </Box>
        </CardContent>
      </Card>

      {/* user */}
      <Paper sx={{ padding: 2 }}>
        <Stack
          direction="column"
          flexWrap="wrap"
          justifyContent={isSmallOrLess ? "center" : "space-between"}
          alignItems="center"
          gap={4}
        >
          {" "}
          <Avatar
            alt={record?.user.name}
            src={record?.user.avatar}
            sx={{ width: 180, height: 180 }}
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
            direction="row"
            gap={2}
            padding={1}
            flexWrap="wrap"
            justifyContent="center"
          >
            <CourierInfoBox
              text={t("agents.agent.phone")}
              icon={<PhoneIphoneIcon sx={{ fontSize: 36 }} />}
              value={record?.user.phone}
            />
            <CourierInfoBox
              text={t("agents.agent.email")}
              icon={<EmailIcon sx={{ fontSize: 36 }} />}
              value={record?.user.email}
            />
          </Stack>
        </Stack>
      </Paper>

      {/* agent */}
      <Paper sx={{ padding: 2 }}>
        <Stack
          direction="column"
          flexWrap="wrap"
          justifyContent={isSmallOrLess ? "center" : "space-between"}
          alignItems="center"
          gap={4}
        >
          {" "}
          <Avatar
            alt={record?.agent.name}
            src={record?.agent.avatar}
            sx={{ width: 180, height: 180 }}
          />
          <Stack
            direction={isSmallOrLess ? "column" : "row"}
            alignItems={isSmallOrLess ? "center" : "flex-start"}
            textAlign={isSmallOrLess ? "center" : "left"}
            gap={2}
          >
            <Box>
              <Typography variant="h4">АГЕНТ</Typography>
              <Typography variant="h5">{record?.agent.name}</Typography>
            </Box>
          </Stack>
          <Stack
            direction="row"
            gap={2}
            padding={1}
            flexWrap="wrap"
            justifyContent="center"
          >
            <CourierInfoBox
              text={t("agents.agent.phone")}
              icon={<PhoneIphoneIcon sx={{ fontSize: 36 }} />}
              value={record?.agent.phone}
            />
            <CourierInfoBox
              text={t("agents.agent.email")}
              icon={<EmailIcon sx={{ fontSize: 36 }} />}
              value={record?.agent.email}
            />
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};
