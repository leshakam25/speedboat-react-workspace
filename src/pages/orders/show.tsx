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
  Button,
  Card,
  CardContent,
  CardHeader,
  DataGrid,
  GridColumns,
  IconButton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
  List,
  Paper,
  useMediaQuery,
  useTheme,
} from "@pankod/refine-mui";
// import dayjs from "dayjs";

import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MopedIcon from "@mui/icons-material/Moped";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { CourierInfoBox } from "components";

import { IOrder, IOrderStatus } from "interfacesNew";
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

  const columns = React.useMemo<GridColumns<IOrder>>(
    () => [
      {
        field: "orderNumber",
        headerName: t("orders.titles.list"),
        width: 300,
        renderCell: function render({ row }) {
          return (
            <Stack direction="row" spacing={4} alignItems="center">
              <Box>
                <Typography variant="body1" whiteSpace="break-spaces">
                  {row.orderNumber}
                </Typography>
              </Box>
            </Stack>
          );
        },
      },
    ],
    [t]
  );

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
    <Stack spacing={2}>
      <Card>
        <CardHeader
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
          title={
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h6">
                {t("orders.fields.orderNumber")}
              </Typography>
              <Typography variant="caption">{`#${
                record?.orderNumber ?? ""
              }`}</Typography>
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
          <Box>
            <Typography variant="h6">Маршрут: {record?.route.route}</Typography>
            <Typography variant="h6">Дата: {record?.date}</Typography>
            <Typography variant="h6">Статус: {record?.status.text}</Typography>
            <Typography variant="h6">Создан: {record?.createdAt}</Typography>
          </Box>
        </CardContent>
      </Card>

      <Paper sx={{ padding: 2 }}>
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent={isSmallOrLess ? "center" : "space-between"}
        >
          <Stack
            direction={isSmallOrLess ? "column" : "row"}
            alignItems={isSmallOrLess ? "center" : "flex-start"}
            textAlign={isSmallOrLess ? "center" : "left"}
            gap={2}
          >
            <Avatar
              alt={record?.agent.name}
              src={record?.agent.avatar}
              sx={{ width: 100, height: 100 }}
            />
            <Box>
              <Typography>АГЕНТ</Typography>
              <Typography variant="h6">{record?.agent.name}</Typography>
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
              icon={<MopedIcon sx={{ fontSize: 36 }} />}
              value={record?.agent.email}
            />
          </Stack>
        </Stack>
      </Paper>

      {/* <List
        cardHeaderProps={{
          title: t("orders.deliverables.deliverables"),
        }}
      >
        <DataGrid
          autoHeight
          columns={columns}
          rows={record?.products || []}
          hideFooterPagination
          rowHeight={124}
          components={{
            Footer: CustomFooter,
          }}
        />
      </List> */}
    </Stack>
  );
};
