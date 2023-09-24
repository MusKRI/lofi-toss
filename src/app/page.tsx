import BackgroundVideo from "./components/BackgroundVideo/BackgroundVideo";
import LateralMenu from "./components/LateralMenu/LateralMenu";

export default function Home() {
  return (
    <main className="relative">
      <BackgroundVideo />

      <LateralMenu />
    </main>
  );
}
