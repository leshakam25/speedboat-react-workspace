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
  FormControl,
  Grid,
  TextField,
  SaveButton,
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  Autocomplete,
  useAutocomplete,
  Edit,
  FormLabel,
} from "@pankod/refine-mui";
import { Controller, useForm } from "@pankod/refine-react-hook-form";
import { IOrder, IUser } from "interfaces";

export const OrderEdit: React.FC<IResourceComponentsProps> = () => {
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
  const [status, setStatus] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setRoute(event.target.value);
  };
  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  const { autocompleteProps } = useAutocomplete<IUser>({
    resource: "users",
  });
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-07"));
  return (
    <Edit
      resource="orders"
      isLoading={formLoading}
      actionButtons={<>{<SaveButton onClick={handleSubmit(onFinish)} />}</>}
    >
      <Box
        onSubmit={handleSubmit(onFinish)}
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        autoComplete="on"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} lg={5} spacing={2}>
            {/* route */}
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
              <FormLabel> Выберите пользователя</FormLabel>
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
            </FormControl>{" "}
            {/* date picker */}
            <FormControl fullWidth>
              <FormLabel>{t("orders.steps.date")}</FormLabel>{" "}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  {...register("date")}
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(props) => <TextField {...props} />}
                  ampm={false}
                />
              </LocalizationProvider>
            </FormControl>{" "}
            <FormControl fullWidth>
              <FormLabel> Выберите лодку</FormLabel>
              <Controller
                control={control}
                name="boat"
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
          </Grid>
          <Grid item xs={12} lg={7} spacing={2}>
            <FormControl fullWidth>
              <FormLabel
                sx={{
                  marginBottom: "8px",
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "text.primary",
                }}
              >
                Описание{" "}
              </FormLabel>
              <TextField
                multiline
                rows={5}
                {...register("desc")}
                size="small"
                margin="none"
                variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Edit>
  );
};
