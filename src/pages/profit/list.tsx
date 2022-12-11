import React from "react";
import {
  IResourceComponentsProps,
  useTranslate,
  useNavigation,
} from "@pankod/refine-core";
import {
  Grid,
  List,
  ToggleButton,
  ToggleButtonGroup,
} from "@pankod/refine-mui";

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
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            sx={{ mb: 4, boxShadow: "2" }}
            aria-required
            orientation="horizontal"
            fullWidth
          >
            <ToggleButton value="createInvoice">
              {t("profit.fields.createInvoice")}
            </ToggleButton>
            <ToggleButton value="listInvoice">
              {t("profit.fields.listInvoice")}
            </ToggleButton>
            <ToggleButton value="profit">
              {t("profit.fields.profit")}
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    </List>
  );
};
