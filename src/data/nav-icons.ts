import type { IconType } from 'react-icons';
import { BsEnvelopeHeart, BsGit, BsQuestionLg } from 'react-icons/bs';
import { LuAtom } from 'react-icons/lu';
import type { NavItemKey } from './nav-items';

export const MOBILE_NAV_ICONS: Record<Exclude<NavItemKey, 'home'>, IconType> = {
  about: BsQuestionLg,
  history: BsGit,
  constituents: LuAtom,
  contact: BsEnvelopeHeart,
};
