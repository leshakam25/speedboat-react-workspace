import React from "react";
import {
  Button,
  CardMedia,
  Grid,
  Show,
  Stack,
  Typography,
  DeleteButton,
  RefreshButton,
  EditButton,
  ListButton,
} from "@pankod/refine-mui";
import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
} from "@pankod/refine-core";
import { IBoat } from "interfaces";
import { usePermissions } from "@pankod/refine-core/";

export const BoatShow: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const { queryResult } = useShow<IBoat>();
  const boat = queryResult.data?.data;
  const { data: permissionsData } = usePermissions();

  return (
    <Show
      title={
        <Typography variant="h4" textAlign="left" lineHeight="200%">
          Имя лодки: {boat?.name}
        </Typography>
      }
      resource="boats"
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
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} lg={6}>
          <CardMedia
            sx={{
              maxHeight: 540,
              width: "auto",
              maxWidth: "100%",
              m: "0 auto",
            }}
            component="img"
            src={boat?.image}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6" textAlign="left" lineHeight="200%">
            Номер: {boat?.id}
          </Typography>
          <Typography variant="h6" textAlign="left" lineHeight="200%">
            Приоритет: {boat?.priority}
          </Typography>
          <Typography variant="h6" textAlign="left" lineHeight="200%">
            Вместимость: {boat?.capacity}
          </Typography>
          <Typography variant="h6" textAlign="left" lineHeight="200%">
            Описание: {boat?.desc}
          </Typography>
          <Typography variant="h6" textAlign="left" lineHeight="200%">
            Активность: {boat?.isActive.toString()}
          </Typography>
          <Typography variant="h6" textAlign="left" lineHeight="200%">
            Создана: {boat?.createdAt}
          </Typography>
          <Button variant="outlined">Активность</Button>
        </Grid>
      </Grid>
    </Show>
  );
};
