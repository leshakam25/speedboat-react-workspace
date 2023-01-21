import React from "react";
import {
  IResourceComponentsProps,
  useTranslate,
  useApiUrl,
  HttpError,
} from "@pankod/refine-core";
import {
  Create,
  Box,
  Grid,
  SaveButton,
  Stack,
  Typography,
  FormControl,
  FormLabel,
  TextField,
  Avatar,
  Input,
  Edit,
} from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";
import { IRoute } from "interfaces";
import createdAt from "components/createdAt/index.tsx";

export const RouteEdit: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const apiUrl = useApiUrl();

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    IRoute,
    HttpError & {
      avatar: any; // eslint-disable-line
    }
  >();

  return (
    <Edit
      resource="routes"
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
                  Название:{" "}
                </FormLabel>
                <TextField
                  {...register("name")}
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
                  Длина{" "}
                </FormLabel>
                <TextField
                  {...register(
                    "length"
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
                  Стоимость{" "}
                </FormLabel>
                <TextField
                  {...register("price")}
                  size="small"
                  margin="none"
                  variant="outlined"
                />
              </FormControl>{" "}
              <FormControl>
                <FormLabel
                  sx={{
                    marginBottom: "8px",
                    fontWeight: "700",
                    fontSize: "14px",
                    color: "text.primary",
                  }}
                >
                  Время в пути{" "}
                </FormLabel>
                <TextField
                  {...register("time")}
                  size="small"
                  margin="none"
                  variant="outlined"
                />
              </FormControl>{" "}
            </Stack>
          </Grid>{" "}
          <Grid item paddingX={4} xs={12} md={6}>
            {" "}
            <FormControl
              sx={{
                width: "100%",
                mb: 4,
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
                Описание:{" "}
              </FormLabel>
              <TextField
                fullWidth
                {...register("desc")}
                size="small"
                margin="none"
                variant="outlined"
                multiline
                rows={6}
              />
            </FormControl>{" "}
            <Stack
              gap={1}
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Изображения{" "}
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                Добавьте либо перетащите сюда Изображения{" "}
              </Typography>{" "}
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
                    width: "300px",
                    height: "60px",
                  }}
                  variant="rounded"
                  alt="Route images"
                />
              </label>
            </Stack>{" "}
            <FormControl
              sx={{
                width: "100%",
                mb: 4,
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
                Активность:{" "}
              </FormLabel>
              <TextField
                fullWidth
                {...register("isActive")}
                size="small"
                margin="none"
                variant="outlined"
              />
            </FormControl>{" "}
          </Grid>
        </Grid>{" "}
        <Box sx={{ display: "none" }}>
          <input value={createdAt()} {...register("createdAt")} />{" "}
        </Box>
      </Box>
    </Edit>
  );
};
