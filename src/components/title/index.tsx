import { useRouterContext } from "@pankod/refine-core";
import { Box, Typography } from "@pankod/refine-mui";

import SailingIcon from "@mui/icons-material/Sailing";

type TitleProps = {
  collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Link to="/">
      <Box
        sx={{
          height: "72px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {collapsed ? (
          <SailingIcon sx={{ color: "common.white" }} />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexdirection: "row",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              textDecoration: "none",
            }}
          >
            <SailingIcon />{" "}
            <Typography align="center" fontSize={24} fontWeight={600}>
              Ladoga Rent
            </Typography>
          </Box>
        )}
      </Box>
    </Link>
  );
};
