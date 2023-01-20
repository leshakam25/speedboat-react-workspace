import React from "react";
import {
  IResourceComponentsProps,
  useTranslate,
  HttpError,
} from "@pankod/refine-core";
import {
  Create,
  Box,
  Grid,
  SaveButton,
  Stack,
  FormControl,
  FormLabel,
  TextField,
} from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";
import { IUser } from "interfaces";
import { createdAt } from "../../components/createdAt/index.tsx";

export const BoatCreate: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const active = true;
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    IUser,
    HttpError & {
      avatar: any; // eslint-disable-line
    }
  >();

  return (
    <Create
      resource="boats"
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
                  Имя лодки
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
                  Вместимость лодки{" "}
                </FormLabel>
                <TextField
                  {...register("capacity")}
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
                  Изображение{" "}
                </FormLabel>
                <TextField
                  {...register("image")}
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
                  Описание{" "}
                </FormLabel>
                <TextField
                  {...register("capacity")}
                  size="small"
                  margin="none"
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </FormControl>
            </Stack>
          </Grid>{" "}
          <Grid item paddingX={4} xs={12} md={6}>
            <Stack gap="24px"></Stack>{" "}
            <Box sx={{ display: "none" }}>
              <input value={createdAt()} {...register("createdAt")} />{" "}
              <input {...register("isActive")} />{" "}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Create>
  );
};
