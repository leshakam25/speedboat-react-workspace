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
  Edit,
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
  ToggleButtonGroup,
  ToggleButton,
} from "@pankod/refine-mui";
import { useStepsForm, Controller } from "@pankod/refine-react-hook-form";
import { ICourier, IStore } from "interfaces";

export const OrderEdit: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const stepTitles = [
    t("orders.editSteps.editAgent"),
    t("orders.editSteps.editUser"),
    t("orders.editSteps.editRoute"),
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
  } = useStepsForm<
    ICourier,
    HttpError,
    ICourier & {
      avatar: any; // eslint-disable-line
    }
  >({
    stepsProps: {
      isBackValidate: false,
    },
  });

  const imageInput = watch("avatar");

  const onChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formData = new FormData();

    const target = event.target;
    const file: File = (target.files as FileList)[0];

    formData.append("file", file);

    const res = await axios.post<{ url: string }>(
      `${apiUrl}/media/upload`,
      formData,
      {
        withCredentials: false,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    const { name, size, type, lastModified } = file;

    const imagePayload = [
      {
        name,
        size,
        type,
        lastModified,
        url: res.data.url,
      },
    ];

    setValue("avatar", imagePayload, {
      shouldDirty: true,
    });
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };
  const { autocompleteProps } = useAutocomplete<IStore>({
    resource: "stores",
  });

  const [alignment, setAlignment] = React.useState("orders");

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
              <Grid item xs={12} md={4}>
                <Stack gap={1} justifyContent="center" alignItems="center">
                  <label htmlFor="avatar-input">
                    <Input
                      id="avatar-input"
                      type="file"
                      sx={{
                        display: "none",
                      }}
                      onChange={onChangeHandler}
                    />
                    <input id="file" {...register("avatar")} type="hidden" />
                    <Avatar
                      sx={{
                        cursor: "pointer",
                        width: {
                          xs: "120px",
                          md: "200px",
                        },
                        height: {
                          xs: "120px",
                          md: "200px",
                        },
                      }}
                      src={imageInput && imageInput[0].url}
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
                  <Grid item paddingX={4} xs={12} md={6}>
                    <Stack gap="24px">
                      {" "}
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
                          {...register("name")}
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
                          {...register("gsm")}
                        >
                          {/* 
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
                        {errors.gsm && (
                          <FormHelperText error>
                            {errors.gsm.message}
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
                        <InputMask
                          mask="(999) 999 99 99"
                          disabled={false}
                          {...register("email")}
                        >
                          {/* 
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
                        {errors.gsm && (
                          <FormHelperText error>
                            {errors.gsm.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Stack>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      marginTop: { xs: 2, sm: 2, md: 0 },
                    }}
                    paddingX={4}
                    xs={12}
                    md={6}
                  >
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
              <Grid item xs={12} md={4}>
                <Stack gap={1} justifyContent="center" alignItems="center">
                  <label htmlFor="avatar-input">
                    <Input
                      id="avatar-input"
                      type="file"
                      sx={{
                        display: "none",
                      }}
                      onChange={onChangeHandler}
                    />
                    <input id="file" {...register("avatar")} type="hidden" />
                    <Avatar
                      sx={{
                        cursor: "pointer",
                        width: {
                          xs: "120px",
                          md: "200px",
                        },
                        height: {
                          xs: "120px",
                          md: "200px",
                        },
                      }}
                      src={imageInput && imageInput[0].url}
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
                          {...register("name")}
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
                          {...register("gsm")}
                        >
                          {/* 
                                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
                        {errors.gsm && (
                          <FormHelperText error>
                            {errors.gsm.message}
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
                        <InputMask
                          mask="(999) 999 99 99"
                          disabled={false}
                          {...register("email")}
                        >
                          {/* 
                                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
                        {errors.gsm && (
                          <FormHelperText error>
                            {errors.gsm.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Stack>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      marginTop: { xs: 2, sm: 2, md: 0 },
                    }}
                    paddingX={4}
                    xs={12}
                    md={6}
                  >
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
              orientation="vertical"
              aria-required
            >
              <ToggleButton value="valaam">
                {t("enum.routes.valaam")}
              </ToggleButton>
              <ToggleButton value="schery">
                {t("enum.routes.shchery")}
              </ToggleButton>
              <ToggleButton value="valaam and schery">
                {t("enum.routes.valaam and shchery")}
              </ToggleButton>
            </ToggleButtonGroup>
          </>
        );
    }
  };

  return (
    <Edit
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
    </Edit>
  );
};
