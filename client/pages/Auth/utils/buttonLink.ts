import { ButtonProps } from "antd";
import { NavigateFunction } from "react-router";

export const buttonLink = (path: string, navigate: NavigateFunction): ButtonProps => ({
  onClick() {
    navigate(path);
  },
  type: 'link'
})
