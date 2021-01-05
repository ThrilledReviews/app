import * as toi from '@toi/toi';
import * as toix from '@toi/toix';

export const isFullName = toi.str.length(6, 25).and(toix.str.trim());
export const isBusinessName = toi.str.length(6, 40).and(toix.str.trim());
export const isUsername = toi.str
  .length(3, 15)
  .and(toi.str.regex(/^[a-z0-9_]+$/i))
  .and(toix.str.lowercase())
  .and(toix.str.trim());

export const isAreaCode = toi.str.length(3, 3).and(toi.str.regex(/^[0-9]+$/));

export const isElevenDigitPhone = toix.str
  .startsWith('+')
  .and(toix.str.phoneNumber())
  .and(toi.str.length(12, 12));