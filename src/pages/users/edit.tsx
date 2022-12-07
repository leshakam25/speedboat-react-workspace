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
  Edit,
  Box,
  FormControl,
  FormLabel,
  Grid,
  Stack,
  TextField,
  Typography,
  useAutocomplete,
  Input,
  TextFieldProps,
} from "@pankod/refine-mui";
import { useStepsForm } from "@pankod/refine-react-hook-form";
import { IUser } from "interfacesNew";

export const UserEdit: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const apiUrl = useApiUrl();

  const {
    refineCore: { onFinish, formLoading },
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useStepsForm<
    IUser,
    HttpError & {
      avatar: any; // eslint-disable-line
    }
  >({
    warnWhenUnsavedChanges: true,
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
  const { autocompleteProps } = useAutocomplete<IUser>({
    resource: "users",
  });

  const [alignment, setAlignment] = React.useState("orders");

  return (
    <Edit isLoading={formLoading}>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
        autoComplete="off"
      >
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
                    <TextField size="small" margin="none" variant="outlined" />
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
                    {/* {errors.name && (
                      <FormHelperText error>
                        {errors.name.message}
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
                    {/* {errors.phone && (
                      <FormHelperText error>
                        {errors.phone.message}
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
                    {/* {errors.email && (
                      <FormHelperText error>
                        {errors.email.message}
                      </FormHelperText>
                    )} */}
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
      </Box>
    </Edit>
  );
};
