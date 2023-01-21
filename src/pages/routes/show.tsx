import React from "react";
import {
  Avatar,
  Box,
  Grid,
  GridColumns,
  Show,
  Stack,
  Typography,
  useDataGrid,
} from "@pankod/refine-mui";
import {
  HttpError,
  IResourceComponentsProps,
  useShow,
  useTranslate,
} from "@pankod/refine-core";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { IRoute, IUser, IUserFilterVariables } from "interfaces";
import { InfoBox } from "components";

const UserInfoText: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent={{
      sm: "center",
      lg: "flex-start",
    }}
    gap={1}
  >
    {children}
  </Stack>
);

export const RouteShow: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const { queryResult } = useShow<IRoute>();
  const route = queryResult.data?.data;

  return (
    <Show>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={5}>
          <Box
            sx={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Название</Typography>
            <Typography variant="h6">{route?.name}</Typography>{" "}
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">Номер маршрута</Typography>
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
        </Grid>
        <Grid item xs={12} lg={7}>
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
