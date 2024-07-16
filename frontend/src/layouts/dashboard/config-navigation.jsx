import SvgColor from "src/components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/",
    icon: icon("ic_analytics"),
  },
  {
    title: 'Marathi',
    path: '/marathi',
    icon: icon('ic_cart'),
  },
  {
    title: "login",
    path: "/login",
    icon: icon("ic_lock"),
  },
  // {
  //   title: "exam",
  //   path: "/exam",
  //   icon: icon("ic_lock"),
  // }
];

export default navConfig;
