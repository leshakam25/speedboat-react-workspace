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
  Stack,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  ListButton,
  RefreshButton,
} from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";
import { IUser } from "interfaces";

export const NewsEdit: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const apiUrl = useApiUrl();

  const {
    refineCore: { onFinish, formLoading },
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    IUser,
    HttpError & {
      avatar: any; // eslint-disable-line
    }
  >();

  const watchAvatar = watch("avatar");

  return (
    <Edit
      resource="news"
      isLoading={formLoading}
      actionButtons={<>{<SaveButton onClick={handleSubmit(onFinish)} />}</>}
      title={<Typography variant="h5">Новость</Typography>}
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
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} md={5.9}>
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
                  Заголовок{" "}
                </FormLabel>
                <TextField
                  {...register(
                    "title"
                    // , { required: true }
                  )}
                  size="small"
                  margin="none"
                  variant="outlined"
                />
              </FormControl>{" "}
            </Stack>
          </Grid>{" "}
          <Grid item xs={12} md={5.9}>
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
                  Добавьте изображение
                </FormLabel>
                <TextField
                  {...register(
                    "image"
                    // , { required: true }
                  )}
                  size="small"
                  margin="none"
                  variant="outlined"
                />
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormControl sx={{ width: "100%" }}>
              <FormLabel
                sx={{
                  marginBottom: "8px",
                  fontWeight: "700",
                  fontSize: "14px",
                  color: "text.primary",
                }}
              >
                Введите текст
              </FormLabel>
              <TextField
                {...register(
                  "text"
                  // , { required: true }
                )}
                fullWidth
                multiline
                rows={4}
                size="small"
                margin="none"
                variant="outlined"
              />
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Edit>
  );
};
