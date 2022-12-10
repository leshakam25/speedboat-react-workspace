import { useTranslate } from "@pankod/refine-core";
import { Chip, ChipProps } from "@pankod/refine-mui";

type RouteNameProps = {
  status?: "valaam" | "shchery" | "valaam and shchery";
};

export const RouteName: React.FC<RouteNameProps> = ({ status }) => {
  const t = useTranslate();

  let color: ChipProps["color"];

  switch (status) {
    case "valaam":
      color = "default";
      break;
    case "shchery":
      color = "default";
      break;
    case "valaam and shchery":
      color = "default";
      break;
  }

  return (
    <Chip
      variant="outlined"
      size="small"
      color={color}
      label={t(`enum.routes.${status}`)}
    />
  );
};
