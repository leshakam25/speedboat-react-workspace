import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Tab,
  Tabs,
} from "@pankod/refine-mui";
import { IBoat, ITimeSpot } from "interfaces";
import React from "react";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";
function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const initialTimeSpot = {
  id: 0,
  time: "",
};
const initialBoat = {
  id: 0,
  name: "",
  capacity: 0,
  isActive: true,
  createdAt: "",
  priority: 0,
};
export const ExcursionsList: React.FC<{ startDate: Date }> = ({
  startDate,
}) => {
  const [value, setValue] = React.useState(0);
  const [timeList, setTimeList] = React.useState<[ITimeSpot]>([
    initialTimeSpot,
  ]);
  const [boatsList, setBoatsList] = React.useState<[IBoat]>([initialBoat]);

  React.useEffect(() => {
    getTimeSpotList();
  }, []);

  React.useEffect(() => {
    getBoatList();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  async function getTimeSpotList() {
    let response = await fetch("http://62.217.182.92:4000/time_spots");

    let data: any = await response.json();
    setTimeList(data);
    return undefined;
  }
  async function getBoatList() {
    let response = await fetch("http://62.217.182.92:4000/boats");

    let data: any = await response.json();
    setBoatsList(data);
    return undefined;
  }
  return (
    <Card
      sx={{
        height: "100%",
        paddingX: { xs: 2 },
        boxShadow: "none",
        border: 0.1,
      }}
    >
      <CardHeader title={`${startDate.toDateString()}`}></CardHeader>
      <CardContent>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {timeList.length > 0 &&
            timeList.map(({ time }, index) => {
              return (
                <Tab
                  label={time}
                  key={"timespots-tab-" + index}
                  {...a11yProps(index)}
                />
              );
            })}
        </Tabs>

        {boatsList.length > 0 &&
          boatsList.map((boat, index) => {
            const { name, capacity } = boat;
            return (
              <Box display={"flex"} alignItems={"center"}>
                {name}
                <Box display={"flex"} alignItems={"center"}>
                  {[...Array(capacity)].map((customerIcon, index) => (
                    <AirlineSeatReclineExtraIcon />
                  ))}
                </Box>
              </Box>
            );
          })}
        {boatsList[0].name}
      </CardContent>
    </Card>
  );
};
