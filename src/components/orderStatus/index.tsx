import { useTranslate } from "@pankod/refine-core";
import { Chip, ChipProps } from "@pankod/refine-mui";

type OrderStatusProps = {
  status?: string;
};

export const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
  const t = useTranslate();

  let color: ChipProps["color"];

  switch (status) {
    case "payment is expected":
      color = "warning";
      break;
    case "paid":
      color = "info";
      break;
    case "done":
      color = "success";
      break;
    case "cancelled":
      color = "error";
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
