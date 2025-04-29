import React, { useState } from "react";

// Types for props

type HugeComponentProps = {
    title: string;
    paragraphs: string[];
};

type ProfileCardProps = {
    name: string;
    age: number;
    skills: string[];
};

type TreeProps = {
    depth: number;
};

// Sub-components

function HugeComponent({ title, paragraphs }: HugeComponentProps) {
    return (
        <div>
            <h1>{title}</h1>
            <div>
                {paragraphs.map((text, idx) => (
                    <p key={idx}>{text}</p>
                ))}
            </div>
        </div>
    );
}

function ProfileCard({ name, age, skills }: ProfileCardProps) {
    return (
        <div>
            <h2>{name}</h2>
            <p>Age: {age}</p>
            <h3>Skills:</h3>
            <ul>
                {skills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                ))}
            </ul>
        </div>
    );
}

function Tree({ depth }: TreeProps) {
    if (depth <= 0) return <div>Leaf 🌿</div>;

    return (
        <div>
            Branch 🌳 (depth {depth})
            <div>
                <Tree depth={depth - 1} />
                <Tree depth={depth - 2} />
            </div>
        </div>
    );
}

// Main Super Crazy Component

export function StateChaosUltimate() {
    const modes = ["counter", "huge", "profile", "forest", "nothing", "reset"] as const;
    const [modeIndex, setModeIndex] = useState<number>(0);

    const [counter, setCounter] = useState<number>(0);
    const [paragraphs, setParagraphs] = useState<string[]>([
        "Lorem ipsum dolor sit amet.",
        "Consectetur adipiscing elit.",
        "Sed do eiusmod tempor incididunt ut labore.",
    ]);
    const [profile, setProfile] = useState<ProfileCardProps>({
        name: "Mystery Person",
        age: 42,
        skills: ["React", "JavaScript", "CSS"],
    });
    const [forestDepth, setForestDepth] = useState<number>(3);

    const nextMode = (): void => {
        setModeIndex((i) => (i + 1) % modes.length);
    };

    const mode = modes[modeIndex];

    if (mode === "counter") {
        return (
            <div>
                <h1>Counter Mode</h1>
                <p>{counter}</p>
                <button onClick={() => setCounter((c) => c + 1)}>Increment</button>
                <button onClick={nextMode}>Next Mode</button>
            </div>
        );
    }

    if (mode === "huge") {
        return (
            <div>
                <HugeComponent title="Massive Wall of Text" paragraphs={paragraphs} />
                <button onClick={() => setParagraphs((prev) => [...prev, `New paragraph ${prev.length}`])}>
                    Add Paragraph
                </button>
                <button onClick={nextMode}>Next Mode</button>
            </div>
        );
    }

    if (mode === "profile") {
        return (
            <div>
                <ProfileCard name={profile.name} age={profile.age} skills={profile.skills} />
                <button
                    onClick={() =>
                        setProfile((p) => ({
                            ...p,
                            age: p.age + 1,
                            skills: [...p.skills, `Skill ${p.skills.length + 1}`],
                        }))
                    }
                >
                    Add Skill
                </button>
                <button onClick={nextMode}>Next Mode</button>
            </div>
        );
    }

    if (mode === "forest") {
        return (
            <div>
                <h1>Forest Mode</h1>
                <Tree depth={forestDepth} />
                <button onClick={() => setForestDepth((d) => d + 1)}>Grow Deeper</button>
                <button onClick={() => setForestDepth((d) => Math.max(d - 1, 1))}>Prune Tree</button>
                <button onClick={nextMode}>Next Mode</button>
            </div>
        );
    }

    if (mode === "nothing") {
        return (
            <div>
                <h1>Nothingness</h1>
                <p>There is nothing here.</p>
                <button onClick={nextMode}>Next Mode</button>
            </div>
        );
    }

    if (mode === "reset") {
        return (
            <div>
                <h1>System Reset</h1>
                <button
                    onClick={() => {
                        setCounter(0);
                        setParagraphs([
                            "Lorem ipsum dolor sit amet.",
                            "Consectetur adipiscing elit.",
                            "Sed do eiusmod tempor incididunt ut labore.",
                        ]);
                        setProfile({
                            name: "Mystery Person",
                            age: 42,
                            skills: ["React", "JavaScript", "CSS"],
                        });
                        setForestDepth(3);
                        setModeIndex(0);
                    }}
                >
                    Restart All
                </button>
            </div>
        );
    }

    return (
        <div>
            <h1>Unknown Mode</h1>
            <button onClick={nextMode}>Try Again</button>
        </div>
    );
}
