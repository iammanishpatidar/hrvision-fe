import { Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import React from 'react';

type SidePanelProps = {
  logoSrc?: string;
  headingTop?: string;
  headingBottom?: string;
  subheadingTop?: string;
  subheadingBottom?: string;
  illustrationSrc?: string;
  className?: string;
};

const SidePanel: React.FC<SidePanelProps> = ({
  logoSrc,
  headingTop,
  headingBottom,
  subheadingTop,
  subheadingBottom,
  illustrationSrc,
  className = '',
}) => {
  return (
    <div
      className={`
      flex flex-col gap-4 bg-sidePanel-backgorund rounded-2xl px-8 py-16 w-full h-full bg-[image:var(--image-auth-background)] bg-contain bg-center bg-no-repeat
      ${className}
    `}
    >
      <img src={logoSrc} alt={'logoAlt'} className="w-52" />
      <div className="flex flex-col gap-4 h-full w-full">
        <div>
          <Typography tag="h4" className="!font-bold text-sidePanel-heading">
            {headingTop}
          </Typography>
          <Typography tag="h4" className="font-medium text-sidePanel-heading">
            {subheadingTop}
          </Typography>
        </div>
        <div className="flex-grow flex justify-center items-center w-full">
          <img src={illustrationSrc} alt="Sidebar illustration" className="w-[400px]" />
        </div>
        <div>
          <Typography tag="h4" className="!font-semibold text-sidePanel-heading text-center">
            {headingBottom}
          </Typography>
          <Typography tag="t4" className="text-center">
            {subheadingBottom}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
