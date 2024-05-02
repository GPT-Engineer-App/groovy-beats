import React, { useState, useRef } from "react";
import { Box, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text, VStack, HStack, IconButton, useBoolean, Center } from "@chakra-ui/react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

const Index = () => {
  const [isPlaying, setIsPlaying] = useBoolean();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const songs = [
    {
      title: "Song 1",
      url: "https://proxy.example.com/https://www.example.com/song1.mp3",
    },
    {
      title: "Song 2",
      url: "https://proxy.example.com/https://www.example.com/song2.mp3",
    },
  ];
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying.toggle();
    if (prevValue) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
    if (isPlaying) audioRef.current.play();
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSkip = (direction) => {
    let index = currentSongIndex;
    if (direction === "forward") {
      index = (currentSongIndex + 1) % songs.length;
    } else {
      index = (currentSongIndex - 1 + songs.length) % songs.length;
    }
    setCurrentSongIndex(index);
    setIsPlaying.off();
  };

  return (
    <Center minH="100vh" p={4}>
      <VStack spacing={4}>
        <audio ref={audioRef} src={songs[currentSongIndex].url} onLoadedData={handleLoadedData} onTimeUpdate={handleTimeUpdate} onEnded={() => handleSkip("forward")} />

        <Text fontSize="xl">{songs[currentSongIndex].title}</Text>

        <HStack>
          <IconButton icon={<FaBackward />} onClick={() => handleSkip("backward")} aria-label="Previous song" />
          <IconButton icon={isPlaying ? <FaPause /> : <FaPlay />} onClick={togglePlayPause} aria-label={isPlaying ? "Pause" : "Play"} />
          <IconButton icon={<FaForward />} onClick={() => handleSkip("forward")} aria-label="Next song" />
        </HStack>

        <Box w="full">
          <Slider
            aria-label="song-progress"
            min={0}
            max={duration}
            value={currentTime}
            onChange={(val) => {
              setCurrentTime(val);
              audioRef.current.currentTime = val;
            }}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      </VStack>
    </Center>
  );
};

export default Index;
