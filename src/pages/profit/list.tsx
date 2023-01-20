import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";
import { CardMedia } from "@pankod/refine-mui";

export const ProfitList: React.FC<IResourceComponentsProps> = () => {
  return (
    <CardMedia
      component="img"
      src="https://yukassa.ru/wp-content/uploads/2020/11/dlya-ip-yukassa-1.jpg"
    />
  );
};
