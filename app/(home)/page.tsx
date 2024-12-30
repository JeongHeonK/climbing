import PopupProvider from "../context/Popup";
import HomeScene from "./components/HomeScene";

export default function Home() {
  return (
    <PopupProvider>
      <HomeScene />
    </PopupProvider>
  );
}
