import React from "react";
import {
  Avatar,
  Grid,
  DeleteButton,
  EditButton,
  ListButton,
  RefreshButton,
  Show,
  Stack,
  Typography,
} from "@pankod/refine-mui";
import { IResourceComponentsProps, useShow } from "@pankod/refine-core";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { IUser } from "interfaces";
import { InfoBox } from "components";
import { usePermissions } from "@pankod/refine-core/";

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

export const UserShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IUser>();
  const user = queryResult.data?.data;
  const { data: permissionsData } = usePermissions();

  return (
    <Show
      resource="users"
      title={<Typography variant="h5">Гость: {user?.name}</Typography>}
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
        <Grid item xs={12} lg={4}>
          <Avatar
            variant="rounded"
            src={user?.avatar}
            sx={{ width: 240, height: 240 }}
          />
          <UserInfoText>
            <InfoBox
              icon={<LocalPhoneOutlinedIcon />}
              text="Номер телефона"
              value={user?.phone}
            />
          </UserInfoText>
          <UserInfoText>
            <InfoBox
              icon={<EmailIcon />}
              text="Электронная почта"
              value={user?.email}
            />
          </UserInfoText>
          <UserInfoText>
            <InfoBox
              icon={<DateRangeOutlinedIcon />}
              text="Создан"
              value={user?.createdAt}
            />
          </UserInfoText>
        </Grid>
      </Grid>
    </Show>
  );
};
