// **** Library Imports ****
import { Howl } from "howler";
import { Play, Pause, SkipBack, SkipForward, Volume1 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { motion, AnimatePresence } from "framer-motion";

// **** Local Imports ****
import { MusicList, LofiList } from "@/assets";
import { useMusicLofi, usePlayer } from "@/app/hooks/useMusicLofi";

function getRandomItem(arr: string[]) {
  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);

  // get random item
  const item = arr[randomIndex];

  return item;
}

const PlayLateral = () => {
  // volumn control
  const [volumeControl, setVolumeControl] = useState(false);

  const { variant } = useMusicLofi();
  const {
    setSelectedHowl,
    playing,
    selectedHowl,
    setPlaying,
    currentTrack,
    setCurrentTrack,
    volume,
    setVolume,
  } = usePlayer();

  const List = useMemo(() => {
    const array = variant === "Lofi" ? LofiList : MusicList;
    const shuffledArray = array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    return shuffledArray;
  }, [variant]);

  console.log(List);

  useEffect(() => {
    const initialTrack = getRandomItem(List);

    if (initialTrack) {
      const newHowl = new Howl({
        src: [initialTrack],
        loop: true,
        autoplay: false,
        html5: true,
      });
      setCurrentTrack(initialTrack);
      setSelectedHowl(newHowl);
    }
  }, [List]);

  const togglePlay = () => {
    if (playing) {
      selectedHowl?.pause();
      setPlaying(false);
    } else {
      selectedHowl?.play();
      setPlaying(true);
    }
  };

  const getNextPlay = () => {
    const indexOfCurrent = List.indexOf(currentTrack);

    let nextIndex = indexOfCurrent + 1;

    if (nextIndex === List.length) {
      nextIndex = 0;
    }

    const nextTrack = List[nextIndex];
    setCurrentTrack(nextTrack);

    if (playing) {
      selectedHowl?.pause();
    }

    const newHowl = new Howl({
      src: nextTrack,
      loop: true,
      autoplay: false,
      html5: true,
    });

    setPlaying(true);
    newHowl.play();
    setSelectedHowl(newHowl);
  };

  const getPreviousPlay = () => {
    const indexOfCurrent = List.indexOf(currentTrack);
    console.log("current index", indexOfCurrent);

    let previousIndex = indexOfCurrent - 1;
    console.log("previous index", previousIndex);

    if (previousIndex === -1) {
      previousIndex = List.length - 1;
    }

    const previousTrack = List[previousIndex];
    setCurrentTrack(previousTrack);

    if (playing) {
      selectedHowl?.pause();
    }

    const newHowl = new Howl({
      src: previousTrack,
      loop: true,
      autoplay: false,
      html5: true,
    });

    setPlaying(true);
    newHowl.play();
    setSelectedHowl(newHowl);
  };

  useEffect(() => {
    Howler.volume(volume / 100);
  }, [volume]);

  return (
    <div className="flex flex-row items-center gap-2">
      <button
        className="border border-transparent p-1 rounded-md group hover:bg-[#222226] hover:border-[#434348]"
        onClick={getPreviousPlay}
      >
        <SkipBack className="h-5 w-5 group-hover:scale-105 group-hover:active:scale-95 transition" />
      </button>

      <button
        className="border border-transparent p-1 rounded-md group hover:bg-[#222226] hover:border-[#434348] outline-none"
        onClick={togglePlay}
      >
        {playing ? (
          <Pause className="h-5 w-5 group-hover:scale-105 group-hover:active:scale-95 transition" />
        ) : (
          <Play className="h-5 w-5 group-hover:scale-105 group-hover:active:scale-95 transition" />
        )}
      </button>

      <button
        className="border border-transparent p-1 rounded-md group hover:bg-[#222226] hover:border-[#434348]"
        onClick={getNextPlay}
      >
        <SkipForward className="h-5 w-5 group-hover:scale-105 group-hover:active:scale-95 transition" />
      </button>

      <button
        className="border border-transparent p-1 rounded-md group hover:bg-[#222226] hover:border-[#434348]"
        onClick={() => {
          setVolumeControl((prev) => !prev);
        }}
      >
        <Volume1 className="h-5 w-5 group-hover:scale-105 group-hover:active:scale-95 transition" />
      </button>

      <AnimatePresence>
        {volumeControl && (
          <motion.div
            onBlur={() => {
              setVolumeControl(false);
            }}
            onMouseOut={() => {
              setTimeout(() => setVolumeControl(false), 2000);
            }}
            initial={{
              width: "50px",
              opacity: 0,
            }}
            animate={{
              width: "100px",
              opacity: 1,
              transition: {
                duration: 0.2,
              },
            }}
            exit={{
              width: "10px",
              opacity: 0,
              transition: {
                duration: 0.2,
              },
            }}
          >
            <Slider.Root
              className="relative flex items-center select-none touch-none w-[100px] h-5"
              defaultValue={[50]}
              value={[volume]}
              max={100}
              min={0}
              step={1}
              onValueChange={(newValue) => {
                setVolume(newValue[0]);
              }}
            >
              <Slider.Track className="bg-[#3b2b1d] relative grow rounded-full h-[6px]">
                <Slider.Range className="absolute bg-[#f3a952] rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-4 h-4 bg-[#f3a952] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none cursor-pointer"
                aria-label="Volume"
              />
            </Slider.Root>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlayLateral;
