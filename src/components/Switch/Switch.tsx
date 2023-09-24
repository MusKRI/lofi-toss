import { Music, Mic2 } from "lucide-react";

import { usePlayer } from "@/app/hooks/useMusicLofi";

import "./switch.css";

type SwitchProps = {
  value: string;
  onValueChange: (value: string) => void;
};

const Switch = ({ value, onValueChange }: SwitchProps) => {
  const { reset, selectedHowl, playing } = usePlayer();

  return (
    <label className="switch">
      <span className="sun">
        <Music className="!w-4 !h-4" />
      </span>
      <span className="moon">
        <Mic2 className="!w-4 !h-4" />
      </span>
      <input
        type="checkbox"
        className="input"
        onClick={() => {
          const newValue = value === "Lofi" ? "Music" : "Lofi";
          onValueChange(newValue);
          if (playing) {
            selectedHowl?.pause();
          }
          reset();
        }}
      />
      <span className="slider"></span>
    </label>
  );
};

export default Switch;
