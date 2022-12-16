import { ReactComponent as backArrow } from './svgs/back.svg';
import { ReactComponent as rightArrow } from './svgs/arrow-right.svg';
import { ReactComponent as leftArrow } from './svgs/arrow-left.svg';
import { ReactComponent as profile } from './svgs/profile.svg';

const icons = {
  backArrow,
  rightArrow,
  leftArrow,
  profile
};

export const Icon = ({ name, ...props }) => {
  const Element = icons[name];
  return <Element {...props} />;
};