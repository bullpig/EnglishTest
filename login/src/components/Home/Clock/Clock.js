import { useEffect, useState } from "react"

export default function Clock(props) {
    const time = parseInt(props.totalTime);
    const {minutes, setMinutes, seconds, setSeconds} = props.params;
    setMinutes(time);
    // console.log(minutes);
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    props.finalSubmit();
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <h1>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1>
    )
}