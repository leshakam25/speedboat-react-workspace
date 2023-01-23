import { useTranslate } from "@pankod/refine-core";
import { Chip, ChipProps } from "@pankod/refine-mui";

type RouteNameProps = {
  status?: number;
};

export const RouteName: React.FC<RouteNameProps> = ({ status }) => {
  const t = useTranslate();
  let text = "";
  let color: ChipProps["color"];

  switch (status) {
    case 0:
      color = "default";
      text = "Валаам";
      break;
    case 1:
      color = "default";
      text = "Шхеры";
      break;
    case 2:
      color = "default";
      text = "Валаам и Шхеры";
      break;
    case 3:
      color = "default";
      text = "Зимняя";
      break;
  }

  return <Chip variant="outlined" size="small" color={color} label={text} />;
};
