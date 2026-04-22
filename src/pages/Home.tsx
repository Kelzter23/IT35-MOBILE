import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonTitle,
  IonToolbar,
  IonLabel,
} from "@ionic/react";
import { home, book as bookOutline, star, search } from "ionicons/icons";
import { Redirect, Route } from "react-router";
import Favorites from "./Hometabs/Favorites";
import Feed from "./Hometabs/Feed";
import Search from "./Hometabs/Search";
import { IonReactRouter } from "@ionic/react-router";

const Home: React.FC = () => {
  const tabs = [
    { name: "Feed", tab: "feed", url: "/app/home/feed", icon: bookOutline },
    {
      name: "Favorites",
      tab: "favorites",
      url: "/app/home/favorites",
      icon: star,
    },
    { name: "Search", tab: "search", url: "/app/home/search", icon: search },
  ];

  return (
    <IonReactRouter>
      <IonTabs>
        <IonTabBar slot="bottom">
          <IonToolbar>
            <IonTitle>Homes</IonTitle>
          </IonToolbar>

          {tabs.map((item, index) => (
            <IonTabButton key={index} tab={item.tab} href={item.url}>
              <IonIcon icon={item.icon} />
              <IonLabel>{item.name}</IonLabel>
            </IonTabButton>
          ))}
        </IonTabBar>

        <IonRouterOutlet>
          <Route exact path="/app/home/feed" component={Feed} />
          <Route exact path="/app/home">
            <Redirect to="/app/home/feed" />
          </Route>

          <Route exact path="/app/home/feed" component={Feed} />
          <Route exact path="/app/home/favorites" component={Favorites} />
          <Route exact path="/app/home/search" component={Search} />
        </IonRouterOutlet>
      </IonTabs>
    </IonReactRouter>
  );
};
export default Home;
