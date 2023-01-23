import React from "react";
import {
  Box,
  CardMedia,
  DeleteButton,
  EditButton,
  ListButton,
  RefreshButton,
  Grid,
  Show,
  Typography,
} from "@pankod/refine-mui";
import { IResourceComponentsProps, useShow } from "@pankod/refine-core";
import { INews } from "interfaces";

import { usePermissions } from "@pankod/refine-core/";

export const NewsShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<INews>();
  const news = queryResult.data?.data;

  const { data: permissionsData } = usePermissions();
  return (
    <Show
      resource="news"
      title={false}
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
        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            m: "0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            {" "}
            <Typography variant="h4" textAlign="center" lineHeight="140%">
              {news?.title}
            </Typography>
            <Typography variant="body2" textAlign="right" lineHeight="200%">
              {news?.author}
            </Typography>
            <Typography variant="body1" textAlign="right" lineHeight="200%">
              {news?.createdAt}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} lg={8}>
          <CardMedia
            component="img"
            src={news?.image}
            sx={{ maxHeight: 540, width: "100%", m: "0 auto" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          lg={12}
          sx={{
            m: "0 auto",
          }}
        >
          {" "}
          <Typography variant="body2" textAlign="justify" lineHeight="200%">
            {news?.text}
          </Typography>
        </Grid>
      </Grid>
    </Show>
  );
};
