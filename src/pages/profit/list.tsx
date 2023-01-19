import React from "react";
import {
  IResourceComponentsProps,
  useTranslate,
  useNavigation,
} from "@pankod/refine-core";
import { Grid, List, Typography } from "@pankod/refine-mui";

export const ProfitList: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();
  const { edit, show } = useNavigation();

  const [alignment, setAlignment] = React.useState("profit");
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <List>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <Typography variant="h4">
            Здесь будет подключена виртуальная касса (ЮКасса, Smartpay,
            Робокасса и т. д.)
          </Typography>
        </Grid>
      </Grid>
    </List>
  );
};
