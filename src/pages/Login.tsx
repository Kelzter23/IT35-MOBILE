import {
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  useIonRouter,
} from "@ionic/react";
import { use } from "react";

const Login: React.FC = () => {
  const navigation = useIonRouter();

  const doLogin = () => {
    navigation.push("/app", "forward", "replace");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonRouterOutlet>
          <IonButton slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButton>
        </IonRouterOutlet>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton expand="full" color="primary" onClick={() => doLogin()}>
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
export default Login;