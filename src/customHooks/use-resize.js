import { useState, useEffect } from "react";
import {
  SCREEN_SSM,
  SCREEN_SM,
  SCREEN_MD,
  SCREEN_LG,
  SCREEN_XL,
  SCREEN_XXL,
} from "./break-points";

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    width,
    SCREEN_SSM: width >= SCREEN_SSM,
    SCREEN_SM: width >= SCREEN_SM,
    SCREEN_MD: width >= SCREEN_MD,
    SCREEN_LG: width >= SCREEN_LG,
    SCREEN_XL: width >= SCREEN_XL,
    SCREEN_XXL: width >= SCREEN_XXL,
  };
};
