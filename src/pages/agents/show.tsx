import React from "react";
import {
  Avatar,
  DeleteButton,
  EditButton,
  Grid,
  ListButton,
  RefreshButton,
  Show,
  Stack,
  Typography,
} from "@pankod/refine-mui";
import { usePermissions } from "@pankod/refine-core/";
import { IResourceComponentsProps, useShow } from "@pankod/refine-core";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { IAgent } from "interfaces";
import { InfoBox } from "components";

export const AgentShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IAgent>();
  const user = queryResult.data?.data;
  const { data: permissionsData } = usePermissions();

  return (
    <Show
      title={<Typography variant="h5">Агент: {user?.name}</Typography>}
      resource="agents"
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
        <Grid item xs={12} lg={3}>
          {" "}
          <Avatar
            variant="rounded"
            src={user?.avatar}
            sx={{ width: 234, height: 234 }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          lg={3}
          gap={2}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <InfoBox
            icon={<LocalPhoneOutlinedIcon />}
            text="Номер телефона"
            value={user?.phone}
          />
          <InfoBox
            icon={<EmailIcon />}
            text="Электронная почта"
            value={user?.email}
          />
          <InfoBox
            icon={<DateRangeOutlinedIcon />}
            text="Создан"
            value={user?.createdAt}
          />
        </Grid>
      </Grid>
    </Show>
  );
};
