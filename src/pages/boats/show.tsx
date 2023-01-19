import React from "react";
import { Grid, Show, Stack, useDataGrid } from "@pankod/refine-mui";
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
        <Grid item xs={12} lg={3}>
          <Stack alignItems="center" spacing={1}>
            <UserInfoText>
              <InfoBox
                // icon={<LocalPhoneOutlinedIcon />}
                text="Имя лодки"
                value={boat?.name}
              />
            </UserInfoText>
            <UserInfoText>
              <InfoBox
                // icon={<EmailIcon />}
                text="Вместимость"
                value={boat?.capacity}
              />
            </UserInfoText>
            <UserInfoText>
              <InfoBox
                // icon={<DateRangeOutlinedIcon />}
                text="Очередь"
                value={boat?.queue}
              />
            </UserInfoText>
          </Stack>
        </Grid>{" "}
        <Grid item xs={12} lg={3}>
          <Stack alignItems="center" spacing={1}>
            <UserInfoText>
              <InfoBox
                // icon={<LocalPhoneOutlinedIcon />}
                text="Статус "
                value={boat?.status}
              />
            </UserInfoText>
            <UserInfoText>
              {/* <IsActive status={boat?.isActive} /> */}
            </UserInfoText>
            <UserInfoText>
              <InfoBox
                // icon={<LocalPhoneOutlinedIcon />}
                text="Создана "
                value={boat?.createdAt}
              />
            </UserInfoText>
            <UserInfoText>
              <IsActive
                // icon={<LocalPhoneOutlinedIcon />}
                text="Активна"
                value={boat?.isActive}
              />
            </UserInfoText>
          </Stack>
        </Grid>
      </Grid>
    </Show>
  );
};
