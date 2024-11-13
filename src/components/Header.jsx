import { Typography, CardHeader } from "@material-tailwind/react";

const Header = ({ heading }) => {
  return (
    <CardHeader
      floated={false}
      shadow={false}
      color="teal"
      variant="gradient"
      className="rounded-md border-b border-white/10 p-4 min-h-32"
    >
      <Typography color="white" className="text-7xl mt-[32px] px-[35px]">
        {heading}
      </Typography>
    </CardHeader>
  );
};

export default Header;
