import React from "react";
import {
  Avatar,
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

export const BoatShow: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const { queryResult } = useShow<IUser>();
  const user = queryResult.data?.data;

  const { dataGridProps } = useDataGrid<IUser, HttpError, IUserFilterVariables>(
    {
      resource: "users",
      initialSorter: [
        {
          field: "createdAt",
          order: "desc",
        },
      ],
      permanentFilter: [
        {
          field: "user.id",
          operator: "eq",
          value: user?.id,
        },
      ],
      initialPageSize: 4,
      queryOptions: {
        enabled: user !== undefined,
      },
      syncWithLocation: false,
    }
  );

  const columns = React.useMemo<GridColumns<IUser>>(
    () => [
      {
        field: "orderNumber",
        headerName: t("orders.fields.orderNumber"),
        width: 100,
      },

      {
        field: "route",
        headerName: t("orders.fields.route"),
        sortable: false,
        width: 150,
      },
      {
        field: "status",
        headerName: t("orders.fields.status"),
        sortable: false,
        width: 150,
      },
      {
        field: "createdAt",
        headerName: t("orders.fields.createdAt"),
      },
    ],
    [t]
  );

  return (
    <Show>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={3}>
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
        </Grid>
      </Grid>
    </Show>
  );
};
