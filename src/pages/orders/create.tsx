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
} from "@pankod/refine-mui";
import { useStepsForm, Controller } from "@pankod/refine-react-hook-form";
import { IAgent, IUser, IOrder } from "interfacesNew";

export const OrderCreate: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const stepTitles = [
    t("orders.steps.agent"),
    t("orders.steps.user"),
    t("orders.steps.route"),
    t("orders.steps.auth"),
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
            <Grid
              container
              sx={{
                marginX: { xs: "0px" },
              }}
            >
              {/* image */}
              <Grid item xs={12} md={4}>
                <Stack gap={1} justifyContent="center" alignItems="center">
                  <Box
                    sx={{
                      maxWidth: "140px",
                    }}
                  >
                    <img
                      src="https://wallbox.ru/resize/800x480/wallpapers/main2/201733/15031899135998db99886518.44634886.jpg"
                      alt=""
                      width="240px"
                    />
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container>
                  {/* left block */}
                  <Grid item paddingX={4} xs={12} md={6}>
                    <Stack gap="24px">
                      <FormControl>
                        <FormLabel
                          sx={{
                            marginBottom: "8px",
                            fontWeight: "700",
                            fontSize: "14px",
                            color: "text.primary",
                          }}
                        >
                          {t("orders.fields.chooseRoute")}
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
                    </Stack>
                  </Grid>
                  {/* right block */}
                  <Grid item paddingX={4} xs={12} md={6}>
                    <Stack gap="24px"> right block</Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </>
        );
      case 3:
        return <></>;
      case 4:
        return <></>;
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
