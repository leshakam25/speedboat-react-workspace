import React from "react";
import axios from "axios";

import InputMask from "react-input-mask";
import {
  IResourceComponentsProps,
  useTranslate,
  useApiUrl,
  HttpError,
} from "@pankod/refine-core";
import {
  Avatar,
  Button,
  Create,
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  SaveButton,
  Stack,
  Step,
  Stepper,
  StepButton,
  TextField,
  Typography,
  useAutocomplete,
  Autocomplete,
  Input,
  TextFieldProps,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  ToggleButtonGroup,
  ToggleButton,
} from "@pankod/refine-mui";
import { useStepsForm, Controller } from "@pankod/refine-react-hook-form";
import { IAgent, IUser, IOrder } from "interfaces";

export const OrderCreate: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const stepTitles = [
    t("orders.steps.agent"),
    t("orders.steps.user"),
    t("orders.steps.route"),
    t("orders.steps.pay"),
  ];
  const apiUrl = useApiUrl();

  const {
    refineCore: { onFinish, formLoading },
    control,
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    steps: { currentStep, gotoStep },
  } = useStepsForm<IOrder, HttpError, IAgent, IUser>({
    stepsProps: {
      isBackValidate: false,
    },
    warnWhenUnsavedChanges: true,
  });

  // const imageInput = watch("avatar");

  // const onChangeHandler = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const formData = new FormData();

  //   const target = event.target;
  //   const file: File = (target.files as FileList)[0];

  //   formData.append("file", file);

  //   const res = await axios.post<{ url: string }>(
  //     `${apiUrl}/media/upload`,
  //     formData,
  //     {
  //       withCredentials: false,
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     }
  //   );

  //   const { name, size, type, lastModified } = file;

  //   // eslint-disable-next-line
  //   const imagePaylod: any = [
  //     {
  //       name,
  //       size,
  //       type,
  //       lastModified,
  //       url: res.data.url,
  //     },
  //   ];
  //   setValue("avatar", imagePaylod, {
  //     shouldDirty: true,
  //   });
  // };

  const { autocompleteProps } = useAutocomplete<IOrder>({
    resource: "orders",
  });

  const [alignment, setAlignment] = React.useState("orders");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const renderFormByStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <Grid
              container
              sx={{
                marginX: { xs: "0px" },
              }}
            >
              {/* avatar */}
              <Grid item xs={12} md={4}>
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
              <Grid item xs={12} md={8}>
                <Grid container>
                  {/* left block */}
                  <Grid item paddingX={4} xs={12} md={6}>
                    <Stack gap="24px">
                      <FormControl fullWidth>
                        <FormLabel
                          sx={{
                            marginBottom: "8px",
                            fontWeight: "700",
                            fontSize: "14px",
                            color: "text.primary",
                          }}
                        >
                          {t("orders.fields.chooseAgent")}
                        </FormLabel>
                        <TextField
                          size="small"
                          margin="none"
                          variant="outlined"
                        />
                        {/* <Controller
                          control={control}
                          name="agents"
                          rules={{
                            required: t("errors.required.field", {
                              field: "agent",
                            }),
                          }}
                          render={({ field }) => (
                            <Autocomplete
                              size="small"
                              {...field}
                              onChange={(_, value) => {
                                field.onChange(value);
                              }}
                              options={agents}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  error={!!errors.gender}
                                  required
                                />
                              )}
                            />
                          )}
                        /> */}
                        {/* {errors.agent && (
                          <FormHelperText error>
                            {errors.agent.message}
                          </FormHelperText>
                        )} */}
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
                          {t("orders.fields.name")}
                        </FormLabel>
                        <TextField
                          // {...register("orders", {
                          //   field: "name",
                          // })}
                          size="small"
                          margin="none"
                          variant="outlined"
                        />
                        {errors.name && (
                          <FormHelperText error>
                            {errors.name.message}
                          </FormHelperText>
                        )}
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
                          {t("orders.fields.phone")}
                        </FormLabel>
                        <InputMask
                          mask="(999) 999 99 99"
                          disabled={false}
                          // {...register(
                          //   "phone"
                          //   {
                          //     required: t("errors.required.field", {
                          //       field: "phone",
                          //     }),
                          //   }
                          // )}
                        >
                          {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                    // @ts-expect-error */}
                          {(props: TextFieldProps) => (
                            <TextField
                              {...props}
                              size="small"
                              margin="none"
                              variant="outlined"
                            />
                          )}
                        </InputMask>
                        {errors.phone && (
                          <FormHelperText error>
                            {errors.phone.message}
                          </FormHelperText>
                        )}
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
                          {t("orders.fields.email")}
                        </FormLabel>
                        <TextField
                          // {...register(
                          //   "email"
                          //   // {
                          //   //   required: t("errors.required.field", {
                          //   //     field: "Email",
                          //   //   }),
                          //   //   pattern: {
                          //   //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          //   //     message: t("errors.required.invalidMail"),
                          //   //   },
                          //   // }
                          // )}
                          size="small"
                          margin="none"
                          variant="outlined"
                        />
                        {errors.email && (
                          <FormHelperText error>
                            {errors.email.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Stack>
                  </Grid>
                  {/* right block */}
                  <Grid item paddingX={4} xs={12} md={6}>
                    <Stack gap="24px"></Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        );
      case 1:
        return (
          <>
            <Grid
              container
              sx={{
                marginX: { xs: "0px" },
              }}
            >
              {/* avatar */}
              <Grid item xs={12} md={4}>
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
              <Grid item xs={12} md={8}>
                <Grid container>
                  {/* left block */}
                  <Grid item paddingX={4} xs={12} md={6}>
                    <Stack gap="24px">
                      <FormControl fullWidth>
                        <FormLabel
                          sx={{
                            marginBottom: "8px",
                            fontWeight: "700",
                            fontSize: "14px",
                            color: "text.primary",
                          }}
                        >
                          {t("orders.fields.chooseUser")}
                        </FormLabel>
                        <TextField
                          size="small"
                          margin="none"
                          variant="outlined"
                        />
                        {/* <Controller
                        control={control}
                        name="agents"
                        rules={{
                          required: t("errors.required.field", {
                            field: "agent",
                          }),
                        }}
                        render={({ field }) => (
                          <Autocomplete
                            size="small"
                            {...field}
                            onChange={(_, value) => {
                              field.onChange(value);
                            }}
                            options={agents}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                error={!!errors.gender}
                                required
                              />
                            )}
                          />
                        )}
                      /> */}
                        {/* {errors.agent && (
                        <FormHelperText error>
                          {errors.agent.message}
                        </FormHelperText>
                      )} */}
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
                          {t("orders.fields.name")}
                        </FormLabel>
                        <TextField
                          {
                            ...register
                            //   (
                            //   "agent"
                            //   {
                            //     required: t("errors.required.field", {
                            //       field: "agent",
                            //     }),
                            //   }
                            // )
                          }
                          size="small"
                          margin="none"
                          variant="outlined"
                        />
                        {errors.name && (
                          <FormHelperText error>
                            {errors.name.message}
                          </FormHelperText>
                        )}
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
                          {t("orders.fields.phone")}
                        </FormLabel>
                        <InputMask
                          mask="(999) 999 99 99"
                          disabled={false}
                          // {...register(
                          //   "phone"
                          //   {
                          //     required: t("errors.required.field", {
                          //       field: "phone",
                          //     }),
                          //   }
                          // )}
                        >
                          {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                  // @ts-expect-error */}
                          {(props: TextFieldProps) => (
                            <TextField
                              {...props}
                              size="small"
                              margin="none"
                              variant="outlined"
                            />
                          )}
                        </InputMask>
                        {errors.phone && (
                          <FormHelperText error>
                            {errors.phone.message}
                          </FormHelperText>
                        )}
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
                          {t("orders.fields.email")}
                        </FormLabel>
                        <TextField
                          // {...register(
                          //   "email"
                          //   // {
                          //   //   required: t("errors.required.field", {
                          //   //     field: "Email",
                          //   //   }),
                          //   //   pattern: {
                          //   //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          //   //     message: t("errors.required.invalidMail"),
                          //   //   },
                          //   // }
                          // )}
                          size="small"
                          margin="none"
                          variant="outlined"
                        />
                        {errors.email && (
                          <FormHelperText error>
                            {errors.email.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Stack>
                  </Grid>
                  {/* right block */}
                  <Grid item paddingX={4} xs={12} md={6}>
                    <Stack gap="24px"></Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        );
      case 2:
        return (
          <>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              sx={{ mb: 4, boxShadow: "2" }}
              fullWidth
              aria-required
              orientation="vertical"
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
          </>
        );
      case 3:
        return (
          <>
            <CardMedia
              component="img"
              alt="uKassa"
              image="https://icqinfo.ru/800/600/https/i3.wp.com/hsp.kz/wp-content/uploads/sposoby-oplaty-platezhnoi-sistemy-yandex-kassa.jpg"
              sx={{ maxWidth: 800, borderRadius: "14px", margin: "0 auto" }}
            />
          </>
        );
    }
  };

  return (
    <Create
      isLoading={formLoading}
      actionButtons={
        <>
          {currentStep > 0 && (
            <Button
              onClick={() => {
                gotoStep(currentStep - 1);
              }}
            >
              {t("buttons.previousStep")}
            </Button>
          )}
          {currentStep < stepTitles.length - 1 && (
            <Button onClick={() => gotoStep(currentStep + 1)}>
              {t("buttons.nextStep")}
            </Button>
          )}
          {currentStep === stepTitles.length - 1 && (
            <SaveButton onClick={handleSubmit(onFinish)} />
          )}
        </>
      }
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        autoComplete="off"
      >
        <Stepper nonLinear activeStep={currentStep}>
          {stepTitles.map((label, index) => (
            <Step
              key={label}
              sx={{
                "& .MuiStepLabel-label": {
                  fontSize: "18px",
                  lineHeight: "32px",
                },
              }}
            >
              <StepButton onClick={() => gotoStep(index)}>{label}</StepButton>
            </Step>
          ))}
        </Stepper>
        <br />
        {renderFormByStep(currentStep)}
      </Box>
    </Create>
  );
};
