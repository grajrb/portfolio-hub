import * as React from 'react';

export interface LeetCodeIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const LeetCodeIcon: React.FC<LeetCodeIconProps> = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    <path d="m14.5 15 3 3 3-3" />
  </svg>
);

export default LeetCodeIcon;
