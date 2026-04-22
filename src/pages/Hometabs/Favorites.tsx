import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Favorites: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
            <IonTitle></IonTitle>
          </IonButtons>
        </IonToolbar>
        <IonContent>
          <h1>Favorites</h1>
        </IonContent>
      </IonHeader>
    </IonPage>
  );
};
export default Favorites;
