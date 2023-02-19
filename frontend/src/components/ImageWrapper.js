import { alpha, styled } from "@mui/material";

export const ImageWrapper = styled("div")(
  ({ theme, image, ...otherProps }) => ({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    margin: "auto",
    width: "50%",
    height: "70vh",
    aspectRatio: 1,
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(3),
      width: `calc(100% - 2*${theme.spacing(3)})`,
      height: "50vh",
    },
    ...otherProps,
  })
);

