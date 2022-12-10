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
  Edit,
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
        autoComplete="on"
      >
        <Grid container spacing={2}>
          {/* choose route */}
          <Grid item xs={12} lg={3} spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-select-small">
                {t("orders.fields.chooseRoute")}
              </InputLabel>
              <Select
                {...register("route.route")}
                labelId="demo-select-small"
                id="demo-select-small"
                value={route}
                label={t("orders.steps.route")}
                onChange={handleChange}
              >
                <MenuItem value="valaam">Валаам</MenuItem>
                <MenuItem value="shchery">Шхеры</MenuItem>
                <MenuItem value="valaam and shchery">Валаам и Шхеры</MenuItem>
              </Select>
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
                        label={t("orders.steps.user")}
                        margin="normal"
                        variant="outlined"
                        error={!!errors.users}
                        // helperText={errors.users?.message}
                        required
                      />
                    )}
                  />
                )}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  {...register("date")}
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(props) => (
                    <TextField sx={{ my: 1 }} {...props} />
                  )}
                  label="Выберите дату и время"
                  ampm={false}
                />
              </LocalizationProvider>
              <Select
                {...register("status.text")}
                value={status}
                label={t("orders.fields.status")}
                onChange={handleChangeStatus}
              >
                <MenuItem value="payment is expected">
                  {t("enum.orderStatuses.payment is expected")}
                </MenuItem>
                <MenuItem value="paid">{t("enum.orderStatuses.paid")}</MenuItem>
                <MenuItem value="done">
                  {t("enum.orderStatuses.done")}
                </MenuItem>{" "}
                <MenuItem value="cancelled">
                  {t("enum.orderStatuses.cancelled")}
                </MenuItem>
              </Select>
            </FormControl>{" "}
          </Grid>
        </Grid>{" "}
      </Box>
    </Edit>
  );
};
