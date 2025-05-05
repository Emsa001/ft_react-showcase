import React, { useState, useStatic } from "react";

type Card = {
    id: number;
    text: string;
};

export function StateApocalypse() {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [messages, setMessages] = useState<string[]>(["Hello", "World"]);
    const [cards, setCards] = useState<Card[]>([
        { id: 1, text: "First Card" },
        { id: 2, text: "Second Card" },
    ]);
    const [bonusActive, setBonusActive] = useState(false);
    const [hiddenNumbers, setHiddenNumbers] = useState<number[]>([1, 2, 3, 4, 5]);
    const [powerUps, setPowerUps] = useState<{ name: string; active: boolean }[]>([
        { name: "Shield", active: true },
        { name: "Boost", active: false },
    ]);

    const incrementAll = () => {
        setIsVisible((v) => !v);
        setCount((c) => c + 1);
        setMessages((msgs) => [...msgs, `Msg ${msgs.length + 1}`]);
        setCards((cards) => [...cards, { id: cards.length + 1, text: `New Card ${cards.length + 1}` }]);
        setBonusActive((b) => !b);
        setHiddenNumbers((nums) => nums.filter((n) => n % 2 === 0));
        setPowerUps((p) =>
            p.map((power) => ({
                ...power,
                active: !power.active,
            }))
        );
    };

    const addHiddenNumber = () => {
        setHiddenNumbers((nums) => [...nums, Math.floor(Math.random() * 100)]);
    };

    return (
        <div>
            <h1>🌪️ STATE APOCALYPSE TEST 🌪️</h1>
            <h2>Count: {count}</h2>
            <button onClick={incrementAll}>Increment All</button>
            <button onClick={addHiddenNumber}>Add Hidden Number</button>

            <p>isVisible: {`${isVisible}`}</p>
            <div>
                {isVisible ? (
                    <div>
                        <h3>✨ Messages ✨</h3>
                        <div>
                            {messages.map((msg, idx) => (
                                <div key={idx}>{msg}</div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3>🚫 Messages Hidden 🚫</h3>
                    </div>
                )}
            </div>

            <div>
                <h3>🃏 Cards 🃏</h3>
                <div>
                    {cards.map((card) => (
                        <div key={card.id}>
                            <strong>{card.text}</strong>
                        </div>
                    ))}
                </div>
            </div>

            {bonusActive && (
                <div>
                    <h3>🎁 BONUS ACTIVE! 🎁</h3>
                    <div>
                        <p>Extra Content Unlocked!</p>
                        <div>
                            {Array.from({ length: 3 }, (_, idx) => (
                                <div key={idx}>Bonus Item {idx + 1}</div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div>
                <h3>🔢 Hidden Numbers 🔢</h3>
                <div>
                    {hiddenNumbers.length > 0 ? (
                        hiddenNumbers.map((num, idx) => <div key={idx}>Hidden: {num}</div>)
                    ) : (
                        <div>No hidden numbers left!</div>
                    )}
                </div>
            </div>

            <div>
                <h3>⚡ Power Ups ⚡</h3>
                <div>
                    {powerUps.map((power, idx) => (
                        <div key={idx}>
                            {power.name}: {power.active ? "ACTIVE" : "INACTIVE"}
                        </div>
                    ))}
                </div>
            </div>

            {count > 2 && (
                <div>
                    <h2>🚀 FINAL PHASE UNLOCKED 🚀</h2>
                    <p>You have clicked over 10 times!</p>
                    <div>
                        {Array.from({ length: count - 10 }, (_, idx) => (
                            <div key={idx}>Overdrive {idx + 1}</div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
