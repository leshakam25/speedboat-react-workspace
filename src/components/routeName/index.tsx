import { useTranslate } from "@pankod/refine-core";
import { Chip, ChipProps, useTheme } from "@pankod/refine-mui";

type RouteProps = {
  status?: "Valaam" | "Shchery" | "Valaam and Shchery";
};

export const RouteName: React.FC<RouteProps> = ({ status }) => {
  const t = useTranslate();
  const { palette } = useTheme();

  let color: ChipProps["color"];

  switch (status) {
    case "Valaam":
      color = "warning";
      break;
    case "Shchery":
      color = "info";
      break;
    case "Valaam and Shchery":
      color = "success";
      break;
  }

  return (
    <Chip
      variant="outlined"
      size="small"
      color={color}
      label={t(`enum.orderStatuses.${status}`)}
    />
  );
};
