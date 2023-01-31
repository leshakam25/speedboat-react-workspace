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
      status = "Ожидается оплата";
      break;
    case "paid":
      color = "info";
      status = "Оплачено";
      break;
    case "done":
      color = "success";
      status = "Выполнено";
      break;
    case "cancelled":
      color = "error";
      status = "Отменено";
      break;
  }

  return <Chip variant="outlined" size="small" color={color} label={status} />;
};
