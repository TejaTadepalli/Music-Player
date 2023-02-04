import {useState, useEffect} from 'react';
import useSound from 'use-sound';
import {AiOutlinePlayCircle, AiOutlinePauseCircle} from "react-icons/ai";
import {BiSkipPrevious, BiSkipNext} from "react-icons/bi";
import { IconContext } from 'react-icons';  // this is used for styling the icons we took from react-icons
// NEED TO IMPORT THE AUDIO FILE OBJECT HERE

export default function Player() {
    const [isPlaying, setIsPlaying] = useState(false);  // this is the current status of the player
    const [time, setTime] = useState({min: "00", sec: "00"});
    const [currTime, setCurrTime] = useState({min: "00", sec: "00"});

    
    const [seconds, setSeconds] = useState();
    const [play, {pause, sound, duration}] = useSound('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', {volume: 0.5});

    useEffect(() => {
        if (duration) {
            const sec = duration / 1000;
            const min = Math.floor(sec / 60);
            const secRemain = Math.floor(sec % 60);
            setTime({min: min, sec: secRemain});
        }
    }, [isPlaying, duration]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));
                const min = Math.floor(sound.seek([]) / 60);
                const sec = Math.floor(sound.seek([]) % 60);
                setCurrTime({min: min, sec: sec});
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound]);

    const playingButton = () => {
        if (isPlaying) {
            pause();
            setIsPlaying(false);
        } else {
            play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="component">
            <h2>Current Song</h2>
            <img className="musicCover" src="https://picsum.photos/200" alt="Music Cover" /> {/* USED LOREM-IPSUM PHOTO GENERATOR*/}
        <div>
            <h3 className="title">SoundHelix Song 6</h3>
            <p className="subTitle">T. Schürger</p>
        </div>
        <div>
            <div className="time">
                <p>{currTime.min}:{currTime.sec}</p>
                <p>{time.min}:{time.sec}</p>
            </div>
            <input
                type="range"
                min="0"
                max={duration / 1000}
                default="0"
                value={seconds}
                className="timeline"
                onChange={(e) => {
                    sound.seek([e.target.value]);
                }}
            />
        </div>
        <div>
            <button className="playButton" color='#fcfdfb'>
                <IconContext.Provider value={{ size: "3em", color: "#060b1a" }}>
                    <BiSkipPrevious />
                </IconContext.Provider>
            </button>
            {!isPlaying ? (
                <button className="playButton" onClick={playingButton}>
                    <IconContext.Provider value={{ size: "3em", color: "#060b1a" }}>
                        <AiOutlinePlayCircle />
                    </IconContext.Provider>
                </button>
            ) : (
                <button className="playButton" onClick={playingButton}>
                    <IconContext.Provider value={{ size: "3em", color: "#060b1a" }}>
                        <AiOutlinePauseCircle />
                    </IconContext.Provider>
                </button>
            )}
            <button className="playButton">
                <IconContext.Provider value={{ size: "3em", color: "#060b1a" }}>
                    <BiSkipNext />
                </IconContext.Provider>
            </button>
        </div>
    </div>
    );
}