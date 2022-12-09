import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import {
  IResourceComponentsProps,
  useTranslate,
  HttpError,
} from "@pankod/refine-core";
import {
  Create,
  FormControl,
  Grid,
  TextField,
  SaveButton,
  Box,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Autocomplete,
  useAutocomplete,
  FormLabel,
} from "@pankod/refine-mui";
import { Controller, useForm } from "@pankod/refine-react-hook-form";
import { IOrder, IUser } from "interfaces";

export const OrderCreate: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<
    IOrder,
    HttpError & {
      avatar: any; // eslint-disable-line
    }
  >();

  const [route, setRoute] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setRoute(event.target.value);
  };

  const currentDate = () => {
    const dateNow = new Date();
    const secondNow = dateNow.getSeconds();
    const hourNow = dateNow.getHours();
    const minuteNow = dateNow.getMinutes();
    const dayNow = dateNow.getDate();
    const monthNow = dateNow.getMonth();
    const yearNow = dateNow.getFullYear();
    const date = `${hourNow}:${minuteNow}:${secondNow}, ${dayNow}.${monthNow}.${yearNow}`;
    return date;
  };

  const { autocompleteProps } = useAutocomplete<IUser>({
    resource: "users",
  });
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
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
          alignItems: "center",
        }}
        autoComplete="on"
      >
        <Grid container spacing={2}>
          {/* choose route */}
          <Grid item xs={12} lg={3} spacing={2}>
            <FormControl fullWidth>
              <FormLabel>{t("orders.steps.route")}</FormLabel>{" "}
              <Select
                fullWidth
                {...register("route.route")}
                labelId="demo-select-small"
                id="demo-select-small"
                value={route}
                onChange={handleChange}
              >
                <MenuItem value="valaam">Валаам</MenuItem>
                <MenuItem value="shchery">Шхеры</MenuItem>
                <MenuItem value="valaam and shchery">Валаам и Шхеры</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <FormLabel> {t("orders.steps.user")}</FormLabel>{" "}
              <Controller
                control={control}
                name="user"
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Autocomplete
                    {...autocompleteProps}
                    {...field}
                    onChange={(_, value) => {
                      field.onChange(value);
                    }}
                    getOptionLabel={(item) => {
                      return (
                        autocompleteProps?.options?.find(
                          (p) => p?.id?.toString() === item?.id?.toString()
                        )?.name ?? ""
                      );
                    }}
                    isOptionEqualToValue={(option, value) =>
                      value === undefined ||
                      option.id.toString() === value.toString()
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        error={!!errors.users}
                        // helperText={errors.users?.message}
                        required
                      />
                    )}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel>{t("orders.steps.date")}</FormLabel>{" "}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  {...register("date")}
                  value={value}
                  onChange={(newValue, register) => {
                    setValue(newValue);
                  }}
                  renderInput={(props) => <TextField {...props} />}
                  ampm={false}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Box sx={{ display: "none" }}>
            <input value={currentDate()} {...register("createdAt")} />
            <input value="payment is expected" {...register("status.text")} />

            {/* agent */}
            <input value="1" {...register("agent.id")} />
            <input value="Иван Семеныч" {...register("agent.name")} />
            <input value="+7 981 822 12 12" {...register("agent.phone")} />
            <input value="semen@vanya.kim" {...register("agent.email")} />
            <input
              value="https://triviaboss.com/static/5e1c43ad54ce5fb6389ee84e27cb5a49/52f06/qfffb216d-531d-409d-a619-079834000f47_Robert-De-Niro.jpg"
              {...register("agent.avatar")}
            />
          </Box>
        </Grid>{" "}
      </Box>
    </Create>
  );
};
