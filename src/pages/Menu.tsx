import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Redirect, Route } from "react-router";
import Home from "./Home";
import About from "./About";
import {
  homeOutline,
  logOutOutline,
  informationCircleOutline,
} from "ionicons/icons";
import { Icon } from "ionicons/dist/types/components/icon/icon";

const Menu: React.FC = () => {
  const path = [
    { name: "Home", url: "/app/home", icon: homeOutline },
    { name: "About", url: "/app/about", icon: informationCircleOutline },
  ];
  return (
    <IonPage>
      <IonSplitPane contentId="main">
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {path.map((item, index) => (
              <IonMenuToggle key={index}>
                <IonItem routerLink={item.url} routerDirection="forward">
                  <IonIcon icon={item.icon} slot="start"></IonIcon>
                  {item.name}
                </IonItem>
              </IonMenuToggle>
            ))}

            <IonButton routerLink="/" routerDirection="back" expand="full">
              <IonIcon icon={logOutOutline} slot="start"></IonIcon>
              Logout
            </IonButton>
          </IonContent>
        </IonMenu>
        <IonRouterOutlet id="main">
          <Route exact path="/app/home" component={Home} />
          <Route exact path="/app/about" component={About} />
          <Route exact path="/app">
            <Redirect to="/app/home" />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};
export default Menu;