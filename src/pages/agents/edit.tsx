import React from "react";
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
  Input,
  TextFieldProps,
  SaveButton,
  RefreshButton,
} from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";
import { IAgent } from "interfaces";
import { ListButton } from "@pankod/refine-mui";

export const AgentEdit: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const apiUrl = useApiUrl();

  const {
    refineCore: { onFinish, formLoading },
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    IAgent,
    HttpError & {
      avatar: any; // eslint-disable-line
    }
  >();

  const watchAvatar = watch("avatar");

  return (
    <Edit
      resource="agents"
      isLoading={formLoading}
      actionButtons={<>{<SaveButton onClick={handleSubmit(onFinish)} />}</>}
      title={<Typography variant="h5">Агент</Typography>}
      breadcrumb={false}
      headerButtons={
        <>
          <ListButton hideText={true} /> <RefreshButton hideText={true} />
        </>
      }
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
                      Имя{" "}
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
                      Номер телефона{" "}
                    </FormLabel>
                    <TextField
                      {...register(
                        "phone"
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
                      Электронная почта{" "}
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
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Edit>
  );
};
