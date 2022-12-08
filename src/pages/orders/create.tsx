import React, { useState } from "react";

import {
  IResourceComponentsProps,
  useTranslate,
  useApiUrl,
  HttpError,
} from "@pankod/refine-core";
import {
  Avatar,
  Create,
  FormControl,
  FormLabel,
  Grid,
  Stack,
  TextField,
  Typography,
  Input,
  ToggleButtonGroup,
  ToggleButton,
  SaveButton,
  Box,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Autocomplete,
  Button,
} from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";
import { IOrder, IUser } from "interfaces";
import { useList } from "@pankod/refine-core";

export const OrderCreate: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const apiUrl = useApiUrl();

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    IOrder,
    HttpError & {
      avatar: any; // eslint-disable-line
    }
  >();
  const [customUserList, setCustomUserList] = useState();
  const customList = useList<IUser>({ resource: "users" });

  const dateNow = new Date();
  const secondNow = dateNow.getSeconds();
  const hourNow = dateNow.getHours();
  const minuteNow = dateNow.getMinutes();
  const dayNow = dateNow.getDate();
  const monthNow = dateNow.getMonth();
  const yearNow = dateNow.getFullYear();
  const currentDate = `${hourNow}:${minuteNow}:${secondNow}, ${dayNow}.${monthNow}.${yearNow}`;

  const [route, setRoute] = React.useState("");
  const log = () => {
    console.log(customList);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setRoute(event.target.value);
  };

  const top100Films = [{ label: "The Shawshank Redemption", year: 1994 }];

  return (
    <Create
      isLoading={formLoading}
      actionButtons={<>{<SaveButton onClick={handleSubmit(onFinish)} />}</>}
    >
      {" "}
      <Box
        onSubmit={handleSubmit(onFinish)}
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        autoComplete="off"
      >
        <Grid container spacing={2}>
          {/* choose route */}
          <Grid item xs={12} lg={3} spacing={2}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <Button sx={{ py: 4 }} onClick={log}>
                log
              </Button>
              <InputLabel id="demo-select-small">Выберите маршрут</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={route}
                label="Выберите маршрут"
                onChange={handleChange}
              >
                <MenuItem value="valaam">Валаам</MenuItem>
                <MenuItem value="schery">Шхеры</MenuItem>
                <MenuItem value="valaam and schery">Валаам и Шхеры</MenuItem>
              </Select>
            </FormControl>{" "}
            <Autocomplete
              disablePortal
              id="users-combo-box"
              options={top100Films}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Выберите гостя"
                  sx={{ m: 1 }}
                />
              )}
            />
            <Autocomplete
              disablePortal
              id="agents-combo-box"
              options={top100Films}
              renderInput={(params) => (
                <TextField
                  variant="outlined"
                  {...params}
                  label="Выберите агента"
                  sx={{ m: 1 }}
                />
              )}
            />
          </Grid>
        </Grid>{" "}
      </Box>
    </Create>
  );
};
