import React from "react";
import { Card, CardHeader, Grid } from "@pankod/refine-mui";
import { useTranslate } from "@pankod/refine-core";

import { RecentOrders } from "components/dashboard";

export const DashboardPage: React.FC = () => {
  const t = useTranslate();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <Card sx={{ height: "100%", paddingX: { xs: 2 } }}>
          <CardHeader title={t("dashboard.recentOrders.title")} />
          <RecentOrders />
        </Card>
      </Grid>
    </Grid>
  );
};
