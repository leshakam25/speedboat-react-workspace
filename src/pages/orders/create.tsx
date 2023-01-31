import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import {
  IResourceComponentsProps,
  useTranslate,
  HttpError,
  useGetIdentity,
  useCreate,
  useNavigation,
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
  FormLabel,
  Switch,
  FormGroup,
  FormControlLabel,
  Typography,
  Stack,
  Slider,
  Button,
} from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";
import { IOrder, IRoute, ITimeSpot, IUser } from "interfaces";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PhoneInput from "react-phone-input-2";

const initialUserData = {
  id: 0,
  name: "",
  phone: "",
  email: "",
  avatar: "",
  createdAt: "",
};

export const OrderCreate: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { data: user } = useGetIdentity();
  const { list } = useNavigation();
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<
    IOrder,
    HttpError & {
      avatar: any; // eslint-disable-line
    }
  >();

  const [route, setRoute] = React.useState("");
  const [prevUserId, setPrevUserId] = useState<number>(0);
  const [time, setTime] = React.useState("");
  const [isUserRegister, setIsUserRegister] = useState<boolean>(false);
  const handleChangeTime = (event: SelectChangeEvent) => {
    setTime(event.target.value);
  };
  const handleChangeRoute = (event: SelectChangeEvent) => {
    setRoute(event.target.value);
  };

  // const { autocompleteProps } = useAutocomplete<IUser>({
  //   resource: "users",
  // });

  const [valueDate, setValueDate] = useState<null>();
  const [routeList, setRouteList] = useState<[IRoute] | []>([]);
  const [personCount, setPersonCount] = useState(1);

  const [timeSpotList, setTimeSpotList] = useState<[ITimeSpot] | []>([]);
  const [userData, setUserData] = useState<IUser>(initialUserData);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { mutate } = useCreate();

  useEffect(() => {
    getRouteList();
  }, []);

  useEffect(() => {
    getTimeSpotList();
  }, []);

  useEffect(() => {
    getLastUserId();
  }, []);

  useEffect(() => {
    if (currentUser && !isUserRegister) setIsUserRegister(true);
  }, [currentUser]);

  async function getTimeSpotList() {
    let response = await fetch("http://62.217.182.92:4000/time_spots");
    let data: any = await response.json();
    setTimeSpotList(data);
    return undefined;
  }

  async function getRouteList() {
    let response = await fetch("http://62.217.182.92:4000/routes");
    let data: any = await response.json();
    setRouteList(data);
    return undefined;
  }

  async function getLastUserId() {
    let response = await fetch("http://62.217.182.92:4000/users");
    let data: any = await response.json();
    setPrevUserId(data.length - 1);
    return undefined;
  }
  // function generateParams<URLSearchParams>(data:IUser) {
  //   return new URLSearchParams(data)
  // }

  // async function regNewUser(data:IUser) {
  //   const params = new URLSearchParams({id:`${data.id}`, name:`${data.name}`, phone:`${data.phone}`, email:`${data.email}`, createdAt:`${data.createdAt}` })

  //   const rawResponse = await fetch(`http://62.217.182.92:4000/users?${params.toString()}`, {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       body:JSON.stringify(data)
  //     },
  //   });
  //   const content = await rawResponse.json();
  //   setValue('user',content.id)
  //   setIsUserRegister(true);
  //   return undefined;
  // }

  // function getDisabledTimeFunction(
  //   timeValue: number,
  //   clockType: ClockPickerView
  // ) {
  //   if (clockType === "minutes" && timeValue !== 0) return true;
  //   if (clockType === "hours") {
  //     const str = `${timeValue}.00`;
  //     const list = [...timeSpotList.map((e) => e.time)];
  //     return !list.includes(str);
  //   }
  //   return false;
  // }
  function handleChangePersonCount(
    event: Event,
    value: number | number[],
    activeThumb: number
  ) {
    if (typeof value === "number") setPersonCount(value);
  }
  const handleSubmitUserRegData = () => {
    const createdAt = new Intl.DateTimeFormat("ru", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).format(new Date());
    const obj = { ...userData, id: prevUserId + 1, createdAt: createdAt };
    mutate(
      {
        resource: "users",
        values: {
          ...obj,
        },
      },
      {
        onError: (error, variables, context) => {
          console.log("Не удалось сохранить пользователя!", error);
        },
        onSuccess: (data, variables, context) => {
          console.log("Пользователь сохранен!", data);
          setCurrentUser({ ...data.data });
          setValue("user", data.data.id);
          // Let's celebrate!
        },
      }
    );
  };
  return (
    <Create
      breadcrumb={false}
      isLoading={formLoading}
<<<<<<< HEAD
      actionButtons={
        <>
          {
            <SaveButton
              disabled={!isUserRegister}
              onClick={(e) => {
                console.log("&&&&&&&&&");
                const createdAt = new Intl.DateTimeFormat("ru", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false,
                }).format(new Date());
                mutate(
                  {
                    resource: "orders",
                    values: {
                      ...getValues(),
                      status: "payment is expected",
                      agent: user.id,
                      createdAt: createdAt,
                      persons: +getValues().persons,
                    },
                  },
                  {
                    onError: (error, variables, context) => {
                      console.log("Не удалось сохранить заказ!", error);
                    },
                    onSuccess: (data, variables, context) => {
                      console.log("Заказ сохранен!", data);
                      // Let's celebrate!
                    },
                  }
                );
                e.preventDefault();
                // handleSubmit(onFinish)
              }}
            />
          }
        </>
      }
=======
      actionButtons={<>{<SaveButton disabled={!isUserRegister} onClick={(e)=>{
        console.log("&&&&&&&&&",);
    const createdAt = new Intl.DateTimeFormat('ru',{
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric',
      hour12: false,
    }).format(new Date())
        mutate(
            {
                resource: "orders",
                values: {
                  ...getValues(),
                  status:"payment is expected",
                  agent:user.id,
                  createdAt:createdAt,
                  persons:+getValues().persons
                },
            },
            {
                onError: (error, variables, context) => {
                  console.log("Не удалось сохранить заказ!", error);
                },
                onSuccess: (data, variables, context) => {
                  console.log("Заказ сохранен!",data);
                  list("orders")
                    // Let's celebrate!
                },
            },) 
        e.preventDefault()
        // handleSubmit(onFinish)
      }} />}</>}
>>>>>>> 0f040814afd9148d3562947f145ac67b18120b7a
    >
      {" "}
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        autoComplete="on"
      >
        <Grid container spacing={2}>
          <Grid item container xs={12} lg={4} spacing={2}>
            {/* route */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel>{t("orders.steps.route")}</FormLabel>{" "}
                <Select
                  fullWidth
                  {...register("route")}
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={route}
                  onChange={handleChangeRoute}
                >
                  {routeList.map(({ name, id }, index) => {
                    return (
                      <MenuItem key={"route name " + index + Date()} value={id}>
                        {name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              {/* date */}
              <FormControl fullWidth>
                <FormLabel>Дата поездки</FormLabel>{" "}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...register("date")}
                    value={valueDate}
                    disablePast={true}
                    onChange={(newValue) => {
                      setValueDate(newValue);
                    }}
                    renderInput={(props) => <TextField {...props} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            {/* time */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <FormLabel>Время отправления</FormLabel>{" "}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Select
                    fullWidth
                    {...register("time")}
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={time}
                    onChange={handleChangeTime}
                  >
                    {timeSpotList.map(({ time, id }, index) => {
                      return (
                        <MenuItem
                          key={"route name " + index + Date()}
                          value={id}
                        >
                          {time}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </LocalizationProvider>
              </FormControl>
            </Grid>
            {/* person counter */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel>
                  Количество людей -{" "}
                  <b style={{ fontSize: 22 }}>{personCount}</b>
                </FormLabel>
                <Slider
                  {...register("persons")}
                  min={1}
                  max={10}
                  value={personCount}
                  onChange={handleChangePersonCount}
                />
              </FormControl>
            </Grid>
          </Grid>
          {/*order's comment*/}
          <Grid item xs={12} lg={8} spacing={2}>
            <FormControl fullWidth>
              <FormLabel
                sx={{
                  marginBottom: "8px",
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "text.primary",
                }}
              >
                Комментарий к заказу{" "}
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
          {/* user block */}
          <Grid item xs={12} spacing={2}>
            <Typography variant="h5">Клиент</Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={isUserRegister}
                    defaultChecked={false}
                    onChange={() => setIsUserRegister(!isUserRegister)}
                  />
                }
                label="клиент уже зарегистрирован"
              />
            </FormGroup>
            {isUserRegister ? (
              <Grid item container xs={12} md={8}>
                {currentUser ? (
                  <>
                    <Typography
                      variant="h6"
                      sx={{
                        "&>span": {
                          fontWeight: 400,
                        },
                      }}
                    >
                      <span>Заказ оформляется на клиента:</span>{" "}
                      {currentUser.name}
                      <span> (Тел:</span> +{currentUser.phone}
                      <span>)</span>
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h6">
                      блок поиска пользователя
                    </Typography>
                  </>
                )}
              </Grid>
            ) : (
              <Grid item container xs={12} md={12}>
                <Grid item xs={12}>
                  <Stack
                    gap="24px"
                    direction="row"
                    alignItems={"flex-end"}
                    flexWrap="wrap"
                    justifyContent={"space-between"}
                  >
                    <FormControl>
                      <FormLabel
                        sx={{
                          marginBottom: "8px",
                          fontWeight: "700",
                          fontSize: "14px",
                          color: "text.primary",
                        }}
                      >
                        Имя
                      </FormLabel>
                      <TextField
                        value={userData.name}
                        id="name"
                        onChange={(e) =>
                          setUserData({ ...userData, name: e.target.value })
                        }
                        size="small"
                        margin="none"
                        type="text"
                        variant="outlined"
                      />
                    </FormControl>{" "}
                    <FormControl
                      sx={{
                        "&>.react-tel-input>input": {
                          minWidth: "222px",
                          height: "40px",
                          borderColor: "rgba(0, 0, 0, 0.23)",
                          borderRadius: "4px",
                        },
                      }}
                    >
                      <FormLabel
                        sx={{
                          marginBottom: "8px",
                          fontWeight: "700",
                          fontSize: "14px",
                          color: "text.primary",
                        }}
                      >
                        Номер телефона
                      </FormLabel>
                      <PhoneInput
                        country={"ru"}
                        value={userData.phone}
                        specialLabel=""
                        onChange={(phone) => {
                          setUserData({ ...userData, phone: phone });
                        }}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel
                        sx={{
                          marginBottom: "8px",
                          fontWeight: "700",
                          fontSize: "14px",
                          color: "text.primary",
                        }}
                      >
                        Эл. почта
                      </FormLabel>
                      <TextField
                        size="small"
                        margin="none"
                        variant="outlined"
                        type={"email"}
                        value={userData.email}
                        id="email"
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                      />
                    </FormControl>
                    <Button
                      variant="contained"
                      sx={{ width: "300px", height: "40px" }}
                      onClick={() => handleSubmitUserRegData()}
                    >
                      Зарегистрировать клиента
                    </Button>
                    {/* <Box sx={{ display: "none" }}>
                      <input value={createdAt()} {...register("createdAt")} />
                    </Box> */}
                  </Stack>
                </Grid>
              </Grid>
            )}
          </Grid>
          {/* date picker */}
          {/* <FormControl fullWidth>
              <FormLabel>{t("orders.steps.date")}</FormLabel>{" "}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  {...register("date")}
                  value={value}
                  onChange={(newValue) => {
                    setValueDate(newValue);
                  }}
                  renderInput={(props) => <TextField {...props} />}
                  ampm={false}
                />
              </LocalizationProvider>
            </FormControl>{" "} */}
          {/* <FormControl fullWidth>
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
            </FormControl> */}
          {/* meta data */}
          {/* <Box sx={{ display: "none" }}>
            <input value={Date()} {...register("createdAt")} />
            <input value="payment is expected" {...register("status")} />

            <input value={user?.id} {...register("agent")} />
          </Box> */}
        </Grid>{" "}
      </Box>
    </Create>
  );
};
