import React from "react";
import { Card, CardHeader, Grid } from "@pankod/refine-mui";
import { useTranslate } from "@pankod/refine-core";

import {
  DailyOrders,
  DailyRevenue,
  NewCustomers,
  RecentOrders,
} from "components/dashboard";

export const DashboardPage: React.FC = () => {
  const t = useTranslate();

  return (
    <Grid container columns={24} spacing={2}>
      <Grid item xs={24} sm={24} md={24} lg={24} xl={10}>
        <Card>
          <DailyRevenue />
        </Card>
      </Grid>
      <Grid item xs={24} sm={24} md={24} lg={12} xl={7}>
        <Card>
          <DailyOrders />
        </Card>
      </Grid>
      <Grid item xs={24} sm={24} md={24} lg={12} xl={7}>
        <Card>
          <NewCustomers />
        </Card>
      </Grid>

      <Grid item xs={24} lg={24} xl={24}>
        <Card sx={{ height: "100%", paddingX: { xs: 2 } }}>
          <CardHeader title={t("dashboard.recentOrders.title")} />
          <RecentOrders />
        </Card>
      </Grid>
    </Grid>
  );
};
