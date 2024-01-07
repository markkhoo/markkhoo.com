type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;

type HSL = `hsl(${number}, ${number}%, ${number}%)`;
type HSLA = `hsla(${number}, ${number}%, ${number}%, ${number})`;

type HexaNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type HexaLetter = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
type HexaChar = HexaLetter | HexaNumber;
type Hexa3 = `${HexaChar}${HexaChar}${HexaChar}`;
// @ts-expect-error: Expression produces a union type that is too complex to represent.
type Hexa6 = `${Hexa3}${Hexa3}`;
type Hexa8 = `${Hexa6}${HexaChar}${HexaChar}`;
type HEX = `#${Hexa3 | Hexa6 | Hexa8}`;

export type Color = HEX | HSL | HSLA | RGB | RGBA;
