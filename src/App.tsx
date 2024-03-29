import { Refine } from "@pankod/refine-core";
import {
  ErrorComponent,
  ReadyPage,
  notificationProvider,
  Layout,
  GlobalStyles,
  CssBaseline,
  RefineSnackbarProvider,
} from "@pankod/refine-mui";
import dataProvider from "@pankod/refine-simple-rest";
import routerProvider from "@pankod/refine-react-router-v6";
// import { useTranslation } from "react-i18next";
import SailingIcon from "@mui/icons-material/Sailing";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import {
  AddShoppingCartOutlined,
  PeopleOutlineOutlined,
  CurrencyRuble,
} from "@mui/icons-material";
import RouteIcon from "@mui/icons-material/Route";
import GroupsIcon from "@mui/icons-material/Groups";
import { authProvider } from "authProvider";
import { DashboardPage } from "pages/dashboard";
import { OrderCreate, OrderEdit, OrderList, OrderShow } from "pages/orders";
import { UserList, UserShow, UserCreate, UserEdit } from "pages/users";
import { AgentList, AgentShow, AgentCreate, AgentEdit } from "pages/agents";
import { BoatList, BoatShow, BoatCreate, BoatEdit } from "pages/boats";
import { NewsList, NewsShow, NewsCreate, NewsEdit } from "pages/news";
import { RouteList, RouteShow, RouteCreate, RouteEdit } from "pages/routes";
import { AuthPage } from "pages/auth";
import { ColorModeContextProvider } from "contexts";
import { Header, Title } from "components";
import { ProfitList } from "pages/profit";

const App: React.FC = () => {
  // const { t, i18n } = useTranslation();
  // const i18nProvider = {
  //   translate: (key: string, params: object) => t(key, params),
  //   changeLocale: (lang: string) => i18n.changeLanguage(lang),
  //   getLocale: () => i18n.language,
  // };

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          routerProvider={{
            ...routerProvider,
            routes: [
              {
                path: "/register",
                element: (
                  <AuthPage
                    type="register"
                    formProps={{
                      defaultValues: {
                        email: "demo@speedboat.ru",
                        password: "demodemo",
                      },
                    }}
                  />
                ),
              },
              {
                path: "/forgot-password",
                element: (
                  <AuthPage
                    type="forgotPassword"
                    formProps={{
                      defaultValues: {
                        email: "demo@speedboat.ru",
                      },
                    }}
                  />
                ),
              },
              {
                path: "/update-password",
                element: <AuthPage type="updatePassword" />,
              },
            ],
          }}
          dataProvider={dataProvider("http://62.217.182.92:4000")}
          authProvider={authProvider}
          // i18nProvider={i18nProvider}
          DashboardPage={DashboardPage}
          Title={Title}
          ReadyPage={ReadyPage}
          Layout={Layout}
          Header={Header}
          LoginPage={() => (
            <AuthPage
              type="login"
              formProps={{
                defaultValues: {
                  email: "demo@speedboat.dev",
                  password: "demodemo",
                },
              }}
            />
          )}
          catchAll={<ErrorComponent />}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
          notificationProvider={notificationProvider}
          resources={[
            {
              name: "news",
              list: NewsList,
              show: NewsShow,
              create: NewsCreate,
              edit: NewsEdit,
              icon: <NewspaperIcon />,
              options: {
                label: "Новости",
                route: "news",
              },
            },
            {
              name: "orders",
              list: OrderList,
              show: OrderShow,
              create: OrderCreate,
              edit: OrderEdit,
              icon: <AddShoppingCartOutlined />,
              options: { label: "Заказы", route: "orders" },
            },
            {
              name: "users",
              list: UserList,
              show: UserShow,
              create: UserCreate,
              edit: UserEdit,
              icon: <PeopleOutlineOutlined />,
              options: { label: "Гости", route: "users" },
            },
            {
              name: "agents",
              list: AgentList,
              show: AgentShow,
              create: AgentCreate,
              edit: AgentEdit,
              icon: <GroupsIcon />,
              options: { label: "Агенты", route: "agents" },
            },

            {
              name: "boats",
              list: BoatList,
              show: BoatShow,
              create: BoatCreate,
              edit: BoatEdit,
              icon: <SailingIcon />,
              options: { label: "Лодки", route: "boats" },
            },
            {
              name: "routes",
              list: RouteList,
              show: RouteShow,
              create: RouteCreate,
              edit: RouteEdit,
              icon: <RouteIcon />,
              options: { label: "Маршруты", route: "routes" },
            },
            {
              name: "profit",
              list: ProfitList,
              icon: <CurrencyRuble />,
              options: { label: "Финансы", route: "profit" },
            },
          ]}
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
};

export default App;
