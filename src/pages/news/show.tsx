import React from "react";
import {
  Box,
  CardMedia,
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
import { INews, IUser, IUserFilterVariables } from "interfaces";
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

export const NewsShow: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const { queryResult } = useShow<INews>();
  const news = queryResult.data?.data;

  return (
    <Show resource="news">
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          lg={7}
          sx={{
            maxHeight: 400,
            width: "auto",
            m: "0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3" textAlign="left" lineHeight="140%">
            {news?.title}
          </Typography>
          <Box>
            <Typography variant="body1" textAlign="right" lineHeight="200%">
              {news?.createdAt}
            </Typography>
            <Typography variant="body2" textAlign="right" lineHeight="200%">
              {news?.author}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} lg={5}>
          <CardMedia
            component="img"
            src={news?.image}
            sx={{ maxHeight: 400, width: "auto", m: "0 auto" }}
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
