import React from "react";
import {
  IResourceComponentsProps,
  useGetIdentity,
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
import { INews } from "interfaces";
import createdAt from "components/createdAt/index.tsx";

export const NewsCreate: React.FC<IResourceComponentsProps> = () => {
  const { data: user } = useGetIdentity();

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    INews,
    HttpError & {
      avatar: any;
    }
  >();

  return (
    <Create
      resource="news"
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
            </FormControl>{" "}
          </Grid>
        </Grid>{" "}
        <Box sx={{ display: "none" }}>
          <input value={createdAt()} {...register("createdAt")} />{" "}
          <input value="Алексей Колесников" {...register("author")} />{" "}
        </Box>
      </Box>
    </Create>
  );
};
