import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Grid,
  Select,
  TextField,
  Typography,
} from "@pankod/refine-mui";
import { useTranslate } from "@pankod/refine-core";

import { ExcursionsList, RecentOrders } from "components/dashboard";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
export const DashboardPage: React.FC = () => {
  const t = useTranslate();
  const [orderList, setOrderList] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  async function getOrderLost(foo: string, bar: string) {
    let response = await fetch("http://62.217.182.92:4000/orders");

    let data: any = await response.json();
    setOrderList(data);
    return undefined;
  }

  useEffect(() => {
    getOrderLost("lll", "dddd");
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <Typography variant="h3" pl={3}>
          Заказов сегодня: {orderList.length}
        </Typography>
      </Grid>
      <Grid item xs={12} lg={3}>
        <DatePicker
          todayButton={<Button variant="contained">сегодня</Button>}
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
      </Grid>
      <Grid item xs={12} lg={9}>
        <ExcursionsList startDate={startDate} />
      </Grid>
      <Grid item xs={12} lg={12}>
        <Typography>Заказы</Typography>
        <Card sx={{ height: "100%", paddingX: { xs: 2 } }}>
          <CardHeader title={t("dashboard.recentOrders.title")} />

          <RecentOrders />
        </Card>
      </Grid>
    </Grid>
  );
};
