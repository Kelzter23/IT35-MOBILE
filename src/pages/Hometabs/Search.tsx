import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Search: React.FC = () => {
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
          <h1>Search</h1>
        </IonContent>
      </IonHeader>
    </IonPage>
  );
};
export default Search;
