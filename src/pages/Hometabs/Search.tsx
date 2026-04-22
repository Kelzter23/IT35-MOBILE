import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chatboxOutline, shareOutline, thumbsUpOutline } from "ionicons/icons";
import { useEffect, useState } from "react";

const Search: React.FC = () => {
  const games = [
    { name: "Tokyo Ghoul", details: "glutton mercenary" },
    { name: "Ant Man", details: "lamigas" },
    { name: "The Legend of Zelda" },
    { name: "Pac-Man" },
    { name: "Super Mario World" },
  ];

  const [searchText, setSearchText] = useState("");
  const [filtered, setFilterGames] = useState(games);

  useEffect(() => {
    const debounce = setTimeout(() => {
      const filtered = games.filter((games) =>
        games.name.toLowerCase().includes(searchText.toLowerCase()),
      );

      setFilterGames(filtered);
    }, 400);

    return () => clearTimeout(debounce);
  }, [searchText]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
            <IonTitle>Search</IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonSearchbar
          placeholder="Search games....."
          value={searchText}
          debounce={0}
          onIonInput={(e) => setSearchText(e.detail.value!)}
        />
        <IonList>
          {filtered.map((item, index) => (
            <IonCard key={index}>
              <img
                alt="Silhouette of mountains"
                src="https://ionicframework.com/docs/img/demos/card-media.png"
              />
              <IonCardHeader>
                <IonCardTitle>{item.name}</IonCardTitle>
                <IonCardSubtitle></IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>{item.details}</IonCardContent>

              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonButton fill="clear" expand="full">
                      <IonIcon icon={thumbsUpOutline}></IonIcon>
                      <IonLabel style={{ marginLeft: "5px" }}>Like</IonLabel>
                    </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton fill="clear" expand="full">
                      <IonIcon icon={chatboxOutline}></IonIcon>
                      <IonLabel style={{ marginLeft: "5px" }}>Comment</IonLabel>
                    </IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton fill="clear" expand="full">
                      <IonIcon icon={shareOutline}></IonIcon>
                      <IonLabel style={{ marginLeft: "5px" }}>Share</IonLabel>
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default Search;
