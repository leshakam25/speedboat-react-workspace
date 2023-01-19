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
                  Очередность лодки
                </FormLabel>
                <TextField
                  {...register("queue")}
                  size="small"
                  margin="none"
                  variant="outlined"
                />
              </FormControl>
              <Box sx={{ display: "none" }}>
                <input value={createdAt()} {...register("createdAt")} />
              </Box>
            </Stack>
          </Grid>{" "}
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
                  Статус лодки
                </FormLabel>
                <TextField
                  {...register("status")}
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
                  Активность{" "}
                </FormLabel>
                <TextField
                  {...register("isActive")}
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
      </Box>
    </Create>
  );
};
