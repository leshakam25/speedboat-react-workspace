import React from "react";

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
} from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";
import { IOrder } from "interfaces";

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

  const [alignment, setAlignment] = React.useState("orders");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const dateNow = new Date();
  const secondNow = dateNow.getSeconds();
  const hourNow = dateNow.getHours();
  const minuteNow = dateNow.getMinutes();
  const dayNow = dateNow.getDate();
  const monthNow = dateNow.getMonth();
  const yearNow = dateNow.getFullYear();
  const currentDate = `${hourNow}:${minuteNow}:${secondNow}, ${dayNow}.${monthNow}.${yearNow}`;

  return (
    <Create
      isLoading={formLoading}
      actionButtons={<>{<SaveButton onClick={handleSubmit(onFinish)} />}</>}
    >
      <Grid container spacing={2}>
        {/* choose route */}
        <Grid item xs={12} lg={12} spacing={2}>
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
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "center",
                mb: 4,
              }}
            >
              {t("orders.fields.chooseRoute")}
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              sx={{ mb: 4, boxShadow: "2" }}
              fullWidth
              aria-required
              orientation="horizontal"
            >
              <ToggleButton value="valaam">
                {t("enum.routes.valaam")}
              </ToggleButton>
              <ToggleButton value="schery">
                {" "}
                {t("enum.routes.shchery")}
              </ToggleButton>
              <ToggleButton value="valaam and schery">
                {t("enum.routes.valaam and shchery")}
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>

        {/* choose agent */}
        {/* <Grid item xs={12} lg={5} spacing={2}>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
              mb: 4,
            }}
          >
            {t("orders.fields.chooseAgent")}
          </Typography>
          <Stack gap={1} justifyContent="center" alignItems="center">
            <label htmlFor="avatar-input">
              <Input
                id="avatar-input"
                type="file"
                sx={{
                  display: "none",
                }}
                // onChange={onChangeHandler}
              />
              <input
                id="file"
                // {...register("avatar")}
                type="hidden"
              />
              <Avatar
                sx={{
                  cursor: "pointer",
                  width: {
                    xs: "120px",
                    md: "160px",
                    lg: "200px",
                  },
                  height: {
                    xs: "120px",
                    md: "160px",
                    lg: "200px",
                  },
                }}
                // src={imageInput && imageInput[0].url}
                alt="User Picture"
              />
            </label>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {t("orders.fields.avatar.label")}
            </Typography>
            <Typography sx={{ fontSize: "12px" }}>
              {t("orders.fields.avatar.description")}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={7} spacing={2} marginBottom={12}>
          <FormControl fullWidth>
            <FormLabel>{t("orders.fields.choose")}</FormLabel>
            <TextField
              size="small"
              margin="none"
              variant="outlined"
            ></TextField>
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>{t("orders.fields.name")}</FormLabel>
            <TextField
              size="small"
              margin="none"
              variant="outlined"
            ></TextField>
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>{t("orders.fields.phone")}</FormLabel>
            <TextField
              size="small"
              margin="none"
              variant="outlined"
            ></TextField>
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>{t("orders.fields.email")}</FormLabel>
            <TextField
              size="small"
              margin="none"
              variant="outlined"
            ></TextField>
          </FormControl>
        </Grid> */}

        {/* choose user */}
        <Grid item xs={12} lg={5} spacing={2}>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              textAlign: "center",
              mb: 4,
            }}
          >
            {t("orders.fields.chooseUser")}
          </Typography>
          <Stack gap={1} justifyContent="center" alignItems="center">
            <label htmlFor="avatar-input">
              <Input
                id="avatar-input"
                type="file"
                sx={{
                  display: "none",
                }}
                // onChange={onChangeHandler}
              />
              <input
                id="file"
                // {...register("avatar")}
                type="hidden"
              />
              <Avatar
                sx={{
                  cursor: "pointer",
                  width: {
                    xs: "120px",
                    md: "160px",
                    lg: "200px",
                  },
                  height: {
                    xs: "120px",
                    md: "160px",
                    lg: "200px",
                  },
                }}
                // src={imageInput && imageInput[0].url}
                alt="User Picture"
              />
            </label>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {t("orders.fields.avatar.label")}
            </Typography>
            <Typography sx={{ fontSize: "12px" }}>
              {t("orders.fields.avatar.description")}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={7} spacing={2}>
          <FormControl fullWidth>
            <FormLabel>{t("orders.fields.choose")}</FormLabel>
            <TextField
              size="small"
              margin="none"
              variant="outlined"
            ></TextField>
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>{t("orders.fields.name")}</FormLabel>
            <TextField
              size="small"
              margin="none"
              variant="outlined"
            ></TextField>
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>{t("orders.fields.phone")}</FormLabel>
            <TextField
              size="small"
              margin="none"
              variant="outlined"
            ></TextField>
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>{t("orders.fields.email")}</FormLabel>
            <TextField
              size="small"
              margin="none"
              variant="outlined"
            ></TextField>
          </FormControl>
        </Grid>
      </Grid>
    </Create>
  );
};
