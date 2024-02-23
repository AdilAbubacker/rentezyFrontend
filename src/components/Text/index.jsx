import React from "react";

const sizeClasses = {
  txtManropeExtraBold46: "font-manrope",
  txtManropeBold18Gray900: "font-manrope",
  txtManropeBold18Gray600: "font-manrope",
  txtManropeExtraBold28: "font-manrope",
  txtManropeRegular20: "font-manrope",
  txtManropeExtraBold20: "font-manrope",
  txtManropeSemiBold16: "font-manrope",
  txtManropeSemiBold18: "font-manrope",
  txtManropeExtraBold36WhiteA700: "font-manrope",
  txtManropeRegular14: "font-manrope",
  txtManropeSemiBold12: "font-manrope",
  txtManropeRegular18: "font-manrope",
  txtManropeSemiBold20Gray900: "font-manrope",
  txtManropeSemiBold20Gray600: "font-manrope",
  txtManropeSemiBold12Gray900: "font-manrope",
  txtManropeSemiBold18Gray700: "font-manrope ",
  txtManropeBold18Deeporange400: "font-manrope",
  txtManropeBold24Gray900: "font-manrope",
  txtManropeSemiBold18Gray600: "font-manrope",
  txtManropeBold18: "font-manrope",
  txtManropeBold1925: "font-manrope",
  txtManropeSemiBold16Gray600: "font-manrope",
  txtManropeExtraBold54: "font-manrope",
  txtManropeSemiBold24Gray600: "font-manrope",
  txtManropeSemiBold16Gray700: "font-manrope",
  txtManropeRegular18Gray600: "font-manrope",
  txtManropeRegular18Gray700: "font-manrope",
  txtManropeExtraBold36: "font-manrope",
  txtManropeSemiBold20: "font-manrope font-semibold",
  txtManropeBold18OrangeA700: "font-bold font-manrope",
  txtManropeSemiBold1283: "font-manrope font-semibold",
  txtManropeBold24: "font-bold font-manrope",
  txtManropeSemiBold24: "font-manrope font-semibold",
  txtManropeBold22: "font-bold font-manrope",
  txtManropeMedium16: "font-manrope font-medium",
  txtMarkoOneRegular20: "font-markoone font-normal",
  txtManropeSemiBold1283Gray700: "font-manrope font-semibold",
};

const Text = ({ children, className = "", size, as, ...restProps }) => {
  const Component = as || "p";

  return (
    <Component
      className={`text-left ${className} ${size && sizeClasses[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
