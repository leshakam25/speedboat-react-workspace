import React from "react";

export const createdAt = () => {
  const dateNow = new Date();
  const secondNow = dateNow.getSeconds();
  const hourNow = dateNow.getHours();
  const minuteNow = dateNow.getMinutes();
  const dayNow = dateNow.getDate();
  const monthNow = dateNow.getMonth();
  const yearNow = dateNow.getFullYear();
  const date = `${hourNow}:${minuteNow}:${secondNow}, ${dayNow}.${monthNow}.${yearNow}`;
  return date;
};

export default createdAt;
