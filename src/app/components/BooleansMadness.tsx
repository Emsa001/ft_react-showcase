import React, { useState } from "react";

// Sub-components

type MiniCardProps = {
    title: string;
    description: string;
};

function MiniCard({ title, description }: MiniCardProps) {
    return (
        <div>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
    );
}

type DetailSectionProps = {
    visible: boolean;
    info: string[];
};

function DetailSection({ visible, info }: DetailSectionProps) {
    if (!visible) {
        return <div>Details Hidden 🔒</div>;
    }

    return (
        <div>
            <h3>Details:</h3>
            <ul>
                {info.map((item, idx) => (
                    <li key={idx}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

// Main Component

export function BooleansMadnessLevels() {
    const levels = ["simple", "arrays", "booleans", "nested", "chaos"] as const;
    const [levelIndex, setLevelIndex] = useState<number>(0);

    const [count, setCount] = useState<number>(0);
    const [items, setItems] = useState<string[]>(["Item 1", "Item 2"]);
    const [showDetails, setShowDetails] = useState<boolean>(true);
    const [cards, setCards] = useState<MiniCardProps[]>([
        { title: "Card 1", description: "First card description" },
        { title: "Card 2", description: "Second card description" },
    ]);

    const nextLevel = () => {
        setLevelIndex((i) => (i + 1) % levels.length);
        setCount(0);
        setItems(["Item 1", "Item 2"]);
        setShowDetails(true);
        setCards([
            { title: "Card 1", description: "First card description" },
            { title: "Card 2", description: "Second card description" },
        ]);
    };

    const increment = () => {
        setCount((c) => c + 1);

        if ((count + 1) % 2 === 0) {
            setItems((prev) => [...prev, `Item ${prev.length + 1}`]);
        }

        if ((count + 1) % 3 === 0) {
            setShowDetails((prev) => !prev);
        }

        if ((count + 1) % 4 === 0) {
            setCards((prev) => [
                ...prev,
                { title: `Card ${prev.length + 1}`, description: `Generated card ${prev.length + 1}` },
            ]);
        }
    };

    const currentLevel = levels[levelIndex];

    return (
        <div>
            <h1>🧩 Booleans & Arrays Levels</h1>
            <h2>Level: {currentLevel.toUpperCase()}</h2>
            <button onClick={nextLevel}>Next Level</button>

            {currentLevel === "simple" && (
                <div>
                    <h3>Simple Counter</h3>
                    <p>Count: {count}</p>
                    <button onClick={increment}>Increment</button>
                </div>
            )}

            {currentLevel === "arrays" && (
                <div>
                    <h3>Items List</h3>
                    <p>Count: {count}</p>
                    <button onClick={increment}>Increment & Add Items</button>
                    <ul>
                        {items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}

            {currentLevel === "booleans" && (
                <div>
                    <h3>Show/Hide Details</h3>
                    <p>Count: {count}</p>
                    <button onClick={increment}>Increment & Toggle Details</button>
                    {showDetails ? <div>Details are Visible ✅</div> : <div>Details are Hidden ❌</div>}
                    <DetailSection visible={showDetails} info={items} />
                </div>
            )}

            {currentLevel === "nested" && (
                <div>
                    <h3>Nested Components Madness</h3>
                    <p>Count: {count}</p>
                    <button onClick={increment}>Increment & Grow Everything</button>

                    {/* Booleans */}
                    {count % 2 === 0 ? <p>Even count 🎯</p> : <p>Odd count 🎲</p>}

                    {/* Arrays */}
                    <ul>
                        {items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>

                    {/* Nested Detail Section */}
                    <DetailSection visible={showDetails} info={items} />

                    {/* Mini Cards */}
                    <div>
                        {cards.map((card, idx) => (
                            <MiniCard key={idx} title={card.title} description={card.description} />
                        ))}
                    </div>
                </div>
            )}

            {currentLevel === "chaos" && (
                <div>
                    <h3>🚨 TOTAL CHAOS 🚨</h3>
                    <p>Count: {count}</p>
                    <button onClick={increment}>Unleash More Chaos</button>

                    {/* Crazy conditions */}
                    {count > 10 ? (
                        <div>
                            <h4>Super Mode: ON</h4>
                            {showDetails ? <p>Secrets revealed!</p> : <p>Secrets hidden...</p>}
                            {items.length > 5 && <p>Item overload!</p>}
                            {cards.length > 3 && <p>Too many cards!!</p>}
                        </div>
                    ) : (
                        <p>Keep clicking to reach super mode...</p>
                    )}

                    {/* Lists */}
                    <ul>
                        {items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>

                    {/* Cards */}
                    <div>
                        {cards.map((card, idx) => (
                            <MiniCard key={idx} title={card.title} description={card.description} />
                        ))}
                    </div>

                    {/* Details */}
                    <DetailSection visible={showDetails} info={items} />
                </div>
            )}
        </div>
    );
}
