import React from "react";
import { createdAt } from "../../components/createdAt/index.tsx";
import InputMask from "react-input-mask";
import {
  IResourceComponentsProps,
  useTranslate,
  useApiUrl,
  HttpError,
} from "@pankod/refine-core";
import {
  Avatar,
  Create,
  Box,
  FormControl,
  FormLabel,
  Grid,
  SaveButton,
  Stack,
  TextField,
  Typography,
  Input,
  TextFieldProps,
} from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";
import { IAgent } from "interfaces";

export const AgentCreate: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const apiUrl = useApiUrl();

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    IAgent,
    HttpError & {
      avatar: any; // eslint-disable-line
    }
  >();

  // const { options } = useSelect({
  //   resource: "users",
  // });

  return (
    <Create
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
                      {...register(
                        "name"
                        // , { required: true }
                      )}
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
                      {t("orders.fields.phone")}
                    </FormLabel>
                    <InputMask
                      mask="9 (999) 999 99 99"
                      disabled={false}
                      {...register(
                        "phone"
                        // , {
                        //   required: t("errors.required.field", {
                        //     field: "phone",
                        //   }),
                        // }
                      )}
                    >
                      {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                    // @ts-expect-error */}
                      {(props: TextFieldProps) => <TextField {...props} />}
                    </InputMask>
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
                      {...register(
                        "email"
                        // , {
                        //   required: t("errors.required.field", {
                        //     field: "Email",
                        //   }),
                        //   pattern: {
                        //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        //     message: t("errors.required.invalidMail"),
                        //   },
                        // }
                      )}
                      size="small"
                      margin="none"
                      variant="outlined"
                    />
                  </FormControl>
                  <Box sx={{ display: "none" }}>
                    <input value={createdAt()} {...register("createdAt")} />
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Create>
  );
};
