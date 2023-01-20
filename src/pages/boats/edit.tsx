import React from "react";
import {
  IResourceComponentsProps,
  useTranslate,
  useApiUrl,
  HttpError,
} from "@pankod/refine-core";
import {
  Edit,
  Box,
  Grid,
  SaveButton,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  CardMedia,
} from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";
import { IBoat } from "interfaces";
import createdAt from "components/createdAt/index.tsx";

export const BoatEdit: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const apiUrl = useApiUrl();

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    IBoat,
    HttpError & {
      avatar: any; // eslint-disable-line
    }
  >();

  return (
    <Edit
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
                  Активность
                </FormLabel>
                <TextField
                  {...register("isActive")}
                  size="small"
                  margin="none"
                  variant="outlined"
                />
              </FormControl>
            </Stack>
          </Grid>{" "}
          <Grid item paddingX={4} xs={12} md={6} width="100%" height="auto">
            <CardMedia
              component="img"
              alt="нет изображения"
              src="https://f.vividscreen.info/soft/b100abd41f4d21bbb996035c73c9660e/Fishing-boat-on-British-Virgin-Islands-800x600.jpg"
            />
          </Grid>
        </Grid>
      </Box>
    </Edit>
  );
};
