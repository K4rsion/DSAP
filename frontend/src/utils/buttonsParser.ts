export const buttonsTypes = [
  `none`,
  `primary`,
  `secondary`,
  `auxiliary`, // usually wheel
  `button4th`, // typically the "Browser Back" button
  `button5th`, // typically the "Browser Forward" button
] as const;

export type ButtonType = (typeof buttonsTypes)[number];
export type ButtonsParserType = {
  [k in ButtonType]: boolean;
} & {
  includes: (...buttons: ButtonType[]) => boolean;
  includesOnly: (...buttons: ButtonType[]) => boolean;
};

export const buttonsParser = (
  e: MouseEvent | number
): Readonly<ButtonsParserType> => {
  const buttons = typeof e === `number` ? e : e.buttons;
  const parsed = {
    none: buttons === 0,
    primary: !!(buttons & 0b1),
    secondary: !!(buttons & 0b10),
    auxiliary: !!(buttons & 0b100),
    button4th: !!(buttons & 0b1000),
    button5th: !!(buttons & 0b10000),
  };

  const includes = (...buttons: ButtonType[]) =>
    buttons.every((b) => parsed[b]);
  const includesOnly = (...buttons: ButtonType[]) =>
    buttonsTypes.every((b) => (buttons.includes(b) && parsed[b]) || !parsed[b]);

  return Object.freeze({
    ...parsed,
    includes,
    includesOnly,
  });
};
