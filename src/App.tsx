import { Refine } from "@pankod/refine-core";
import { KBarProvider } from "@pankod/refine-kbar";
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
import { useTranslation } from "react-i18next";
import {
  AddShoppingCartOutlined,
  PeopleOutlineOutlined,
  CurrencyRuble,
} from "@mui/icons-material";
import GroupsIcon from "@mui/icons-material/Groups";
import { authProvider } from "authProvider";
import { DashboardPage } from "pages/dashboard";
import { OrderCreate, OrderEdit, OrderList, OrderShow } from "pages/orders";
import { UserList, UserShow, UserCreate, UserEdit } from "pages/users";
import { AgentList, AgentShow, AgentCreate, AgentEdit } from "pages/agents";
import { AuthPage } from "pages/auth";
import { ColorModeContextProvider } from "contexts";
import { Header, Title } from "components";
import { ProfitList } from "pages/profit";

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <KBarProvider>
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
            dataProvider={dataProvider("http://localhost:3100")}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
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
                name: "orders",
                list: OrderList,
                show: OrderShow,
                create: OrderCreate,
                edit: OrderEdit,
                icon: <AddShoppingCartOutlined />,
              },
              {
                name: "users",
                list: UserList,
                show: UserShow,
                create: UserCreate,
                edit: UserEdit,
                icon: <PeopleOutlineOutlined />,
              },
              {
                name: "agents",
                list: AgentList,
                show: AgentShow,
                create: AgentCreate,
                edit: AgentEdit,
                icon: <GroupsIcon />,
              },

              { name: "profit", list: ProfitList, icon: <CurrencyRuble /> },
            ]}
          />
        </RefineSnackbarProvider>
      </ColorModeContextProvider>
    </KBarProvider>
  );
};

export default App;
