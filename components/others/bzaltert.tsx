import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
export default function BZAlert({ variant = "", title = "", desc = "", show = null, timeout = 5000 }) {
    const [hidden, setHidden] = useState(!show);
    const [color, setColor] = useState("");

    useEffect(() => {
        if (variant === "success") {
            setColor("text-green-500");
        }
        if (variant === "error") {
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
                <div className="w-full max-w-md mx-auto mt-8">
                    <Card className="shadow-md rounded-lg">
                        <Alert>
                            <div className="flex items-center justify-between">
                                <div className={`space-y-1 ${color}`}>
                                    <AlertTitle>{title}</AlertTitle>
                                    <AlertDescription>{desc}</AlertDescription>
                                </div>
                            </div>
                        </Alert>
                    </Card>
                </div>
            )}

        </>
    );
}
