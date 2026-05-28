// Každá mise má:
// - title, story, ciphertext (co uživatel dešifruje)
// - solution (správný plaintext bez mezer, uppercase)
// - hint: co víme o nastavení (zobrazí se uživateli)
// - setup: správné nastavení Enigmy

export const MISSIONS = [
    {
        id: 1,
        title: "Mission 1 — Weather Report",
        story: "We intercepted an enemy weather report. Intelligence suggests the message begins with \"TODAYSWEATHER\". Decrypt the full message.",
        ciphertext: "QNFGKV HJJDCRV YX VVOSL",
        solution: "TODAYSWEATHERISCLEAR",
        hint: {
            wheels: "3, 1, 2",
            positions: "1, 6, 1",
            plugboard: "None",
            note: "The day is known, but the month is redacted."
        },
        setup: {
            wheels: [
                { id: '3', value: 1 },
                { id: '1', value: 6 },
                { id: '2', value: 1 },
            ],
            plugboard: []
        }
    },
    {
        id: 2,
        title: "Mission 2 — Supply convoy",
        story: "A supply convoy is moving tonight. The message was partially decoded — it starts with \"CONVOY\". Find out where it's heading.",
        ciphertext: "OCPXBW TBHOH DGXFOLDIB",
        solution: "CONVOYHEADSNORTHEAST",
        hint: {
            wheels: "2, ?, 1",
            positions: "4, 1, 9",
            plugboard: "A↔Z, B↔Y",
            note: "Two plugboard cables were confirmed by a captured codebook."
        },
        setup: {
            wheels: [
                { id: '2', value: 4 },
                { id: '4', value: 1 },
                { id: '1', value: 9 },
            ],
            plugboard: [
                { from: 'A', to: 'Z' },
                { from: 'B', to: 'Y' },
            ]
        }
    },
    {
        id: 3,
        title: "Mission 3 — U-boat coordinates",
        story: "A U-boat is reporting its position. The message ends with \"ATLANTT\". Decode the coordinates before it disappears.",
        ciphertext: "VQBKVUBB TWABLBEL MJPDG MRTVFOX",
        solution: "GUSTLOFFPOSITIONNORTHATLANTT",
        hint: {
            wheels: "5, 3, 4",
            positions: "20, 26, 21",
            plugboard: "H↔M, T↔S, A↔?",
            note: "Three cables were found on a captured cipher officer."
        },
        setup: {
            wheels: [
                { id: '5', value: 12 },
                { id: '3', value: 3 },
                { id: '4', value: 21 },
            ],
            plugboard: [
                { from: 'H', to: 'M' },
                { from: 'T', to: 'S' },
                { from: 'X', to: 'Q' },
            ]
        }
    }
];
