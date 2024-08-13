import { useState, useEffect } from 'react';

export default function BZAlert({ variant = "", title = "", desc = "", show = null, timeout = 5000 }) {
    const [hidden, setHidden] = useState(!show);
    const [color, setColor] = useState("");

    useEffect(() => {
        if(variant === "success"){
            setColor("text-green-500");
        }
        if(variant === "error"){
            setColor("text-red-500");
        }
        if (show) {
            setHidden(false);
            const timer = setTimeout(() => {
                setHidden(true);
            }, timeout);

            return () => clearTimeout(timer); // Cleanup the timer on component unmount or prop change
        }
    }, [show, timeout, variant]);

    return (
        <>
            {!hidden && (
                <div className={`content-center`}>
                    <div className={color}>
                        <h4 className={"text-2xl"}>
                            {title}
                        </h4>
                        <p>{desc}</p>
                    </div>

                </div>
            )}
        </>
    );
}
