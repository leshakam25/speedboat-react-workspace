import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { createdAt } from "../../components/createdAt/index.tsx";

import {
  IResourceComponentsProps,
  useTranslate,
  HttpError,
  useGetIdentity,
} from "@pankod/refine-core";
import {
  Create,
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
  FormLabel,
} from "@pankod/refine-mui";
import { Controller, useForm } from "@pankod/refine-react-hook-form";
import { IOrder, IUser } from "interfaces";

export const OrderCreate: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { data: user } = useGetIdentity();

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
          <Grid item xs={12} lg={3} spacing={2}>
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
                <MenuItem value="valaam">????????????</MenuItem>
                <MenuItem value="shchery">??????????</MenuItem>
                <MenuItem value="valaam and shchery">???????????? ?? ??????????</MenuItem>
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
            </FormControl>
          </Grid>

          {/* meta data */}
          <Box sx={{ display: "none" }}>
            <input value={createdAt()} {...register("createdAt")} />
            <input value="payment is expected" {...register("status.text")} />

            {/* agent */}
            <input value={user?.id} {...register("agent.id")} />
            <input value={user?.name} {...register("agent.name")} />
            <input value={user?.phone} {...register("agent.phone")} />
            <input value={user?.email} {...register("agent.email")} />
            <input value={user?.avatar} {...register("agent.avatar")} />
          </Box>
        </Grid>{" "}
      </Box>
    </Create>
  );
};
