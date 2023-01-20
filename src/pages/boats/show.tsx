import React from "react";
import {
  Button,
  CardMedia,
  Grid,
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
import { IBoat, IUserFilterVariables } from "interfaces";
import { InfoBox } from "components";
import { IsActive } from "components/isActive";

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

export const BoatShow: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const { queryResult } = useShow<IBoat>();
  const boat = queryResult.data?.data;

  return (
    <Show resource="boats">
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} lg={6}>
          <Stack alignItems="center" spacing={1}>
            <CardMedia
              sx={{ maxHeight: "400px", width: "auto" }}
              component="img"
              src={boat?.image}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h4" textAlign="left" lineHeight="200%">
            Название лодки: "{boat?.name}"
          </Typography>
          <Typography variant="h6" textAlign="left" lineHeight="200%">
            Вместимость лодки: {boat?.capacity}
          </Typography>
          <Typography variant="h6" textAlign="left" lineHeight="200%">
            Активность лодки: {boat?.isActive}
          </Typography>
          <Typography variant="h6" textAlign="left" lineHeight="200%">
            Создана: {boat?.createdAt}
          </Typography>
          <Button variant="outlined">Заказы</Button>
        </Grid>
      </Grid>
    </Show>
  );
};
