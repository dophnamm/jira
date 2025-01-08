import * as React from "react";

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={52}
    height={44}
    viewBox="0 0 53 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m23.3 0 28.746 28.63V44H38.631v-9.845L17.752 13.361h-4.337V44H0V0zm15.33 15.27V0h13.415v15.27z"
      className="ccustom"
      fill="#212326"
    />
  </svg>
);

export default Logo;
