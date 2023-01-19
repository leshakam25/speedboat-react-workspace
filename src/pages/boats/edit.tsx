import React from "react";
import {
  IResourceComponentsProps,
  useTranslate,
  useApiUrl,
  HttpError,
} from "@pankod/refine-core";
import { Edit, Box, Grid, SaveButton } from "@pankod/refine-mui";
import { useForm } from "@pankod/refine-react-hook-form";
import { IUser } from "interfaces";

export const BoatEdit: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const apiUrl = useApiUrl();

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
          <Grid item xs={12} md={8}></Grid>
        </Grid>
      </Box>
    </Edit>
  );
};
