import React from "react";
import {
  Avatar,
  DataGrid,
  Grid,
  GridColumns,
  List,
  Paper,
  Show,
  Stack,
  Typography,
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
import { IUser, IUserFilterVariables } from "interfaces";
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

export const AgentShow: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const { queryResult } = useShow<IUser>();
  const user = queryResult.data?.data;

  return (
    <Show>
      {" "}
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3}>
          <Paper
            sx={{
              boxShadow: "none",
              border: "none",
              p: 2,
              paddingX: { xs: 4, md: 2 },
            }}
          >
            <Stack alignItems="center">
              <Avatar
                variant="rounded"
                src={user?.avatar}
                sx={{ width: 240, height: 240 }}
              />
              <Typography variant="h5">{user?.name}</Typography>
            </Stack>
            <br />
            <Stack alignItems="center" spacing={1}>
              <UserInfoText>
                <InfoBox
                  icon={<LocalPhoneOutlinedIcon />}
                  text={t("orders.fields.phone")}
                  value={user?.phone}
                />
              </UserInfoText>
              <UserInfoText>
                <InfoBox
                  icon={<EmailIcon />}
                  text={t("orders.fields.email")}
                  value={user?.email}
                />
              </UserInfoText>
              <UserInfoText>
                <InfoBox
                  icon={<DateRangeOutlinedIcon />}
                  text={t("orders.fields.createdAt")}
                  value={user?.createdAt}
                />
              </UserInfoText>
            </Stack>
          </Paper>
        </Grid>
        {/* <Grid item xs={12} lg={4}>
          <Stack
            sx={{ boxShadow: "none", border: "none" }}
            direction="column"
            spacing={2}
          >
            <List
              cardHeaderProps={{ title: t("orders.orders") }}
              cardProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}
            >
              <DataGrid
                {...dataGridProps}
                columns={columns}
                autoHeight
                rowsPerPageOptions={[4, 10, 20, 100]}
              />
            </List>
          </Stack>
        </Grid> */}
      </Grid>
    </Show>
  );
};
