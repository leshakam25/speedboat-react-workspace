import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Grid,
  List,
  Select,
  TextField,
  Typography,
} from "@pankod/refine-mui";
import { useTranslate } from "@pankod/refine-core";

import { ExcursionsList, RecentOrders } from "components/dashboard";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch } from "redux-hooks";
import { fetchAllAgents, fetchAllBoats, fetchAllRoutes } from "features/AsyncDictionary/dictionatyAsyncActionis";
export const DashboardPage: React.FC = () => {
  const t = useTranslate();
  const [orderList, setOrderList] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
const dispatch = useAppDispatch()

  async function getOrderLost(foo: string, bar: string) {
    let response = await fetch("http://62.217.182.92:4000/orders");

    let data: any = await response.json();
    setOrderList(data);
    return undefined;
  }

  useEffect(() => {
    getOrderLost("lll", "dddd");
  }, []);

  useEffect(() => {
    dispatch(fetchAllBoats())
    dispatch(fetchAllAgents())
    dispatch(fetchAllRoutes())
  }, [])
  return (
    <List
      headerButtons={false}
      breadcrumb={false}
      title={
        <Typography variant="h4">
          Заказов сегодня: {orderList.length}
        </Typography>
      }
    >
      <Grid container spacing={2}>
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
          <Card sx={{ height: "100%", paddingX: { xs: 2 }, boxShadow: "none" }}>
            <CardHeader title={t("dashboard.recentOrders.title")} />
            <RecentOrders />
          </Card>
        </Grid>
      </Grid>
    </List>
  );
};
