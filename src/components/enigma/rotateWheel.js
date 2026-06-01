export const rotateWheel = (num, prev) => {
    const wheelsCopy = prev.wheels.map(w => ({ ...w }))
    if (wheelsCopy.length === 0) return prev

    let otocDruhe = false
    let otocTreti = false

    if (wheelsCopy[0].value + num > 26 || wheelsCopy[0].value + num <= 0) {
        otocDruhe = true
    }
    if (otocDruhe && (wheelsCopy[1].value + num > 26 || wheelsCopy[1].value + num <= 0)) {
        otocTreti = true
    }

    wheelsCopy[0].value = (wheelsCopy[0].value + num + 25) % 26 + 1

    if (otocDruhe && wheelsCopy[1]) {
        wheelsCopy[1].value = (wheelsCopy[1].value + num + 25) % 26 + 1
    }
    if (otocTreti && wheelsCopy[2]) {
        wheelsCopy[2].value = (wheelsCopy[2].value + num + 25) % 26 + 1
    }

    return { ...prev, wheels: wheelsCopy }
}