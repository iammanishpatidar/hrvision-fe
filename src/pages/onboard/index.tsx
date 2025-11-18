import { Outlet, useLocation } from 'react-router-dom';
import SidePanel from '../../components/SidePanel/SidePanel';

import logo from '../../../assets/logo.png';
import OnboardBasicInfoImage from '../../../assets/Onboard-Basic-Information.png';
import OnboardCompanyImage from '../../../assets/Onboard-Company.png';
import OnboardContactInfoImage from '../../../assets/Onboard-Contact-Information.png';
import OnboardEmergencyContactinfoImage from '../../../assets/Onboard-Emergency-Contact-Information.png';

import { useEffect, useState } from 'react';

const OnBoard = () => {
  const ignoreSidePanel = ['onboard/register-success'];
  const location = useLocation();

  const [sidePanelImage, setSidePanelImage] = useState<string>('');

  const [sidePanelHeadingTop, setSidePanelHeadingTop] = useState<string>('');
  const [sidePanelHeadingBottom, setSidePanelHeadingBottom] = useState<string>('');

  const [sidePanelSubheadingTop, setSidePanelSubheadingTop] = useState<string>('');
  const [sidePanelSubheadingBottom, setSidePanelSubheadingBottom] = useState<string>('');

  const shouldHideSidePanel = ignoreSidePanel.some(pattern => location.pathname.includes(pattern));

  useEffect(() => {
    const path = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    const step = searchParams.get('step');

    if (path === '/onboard/company') {
      setSidePanelImage(OnboardCompanyImage);
      setSidePanelHeadingTop('Join FibonacciX');
      setSidePanelSubheadingTop(
        "Let's get to know you! Share your basic details to personalize your FibonacciX experience."
      );
      setSidePanelHeadingBottom('');
      setSidePanelSubheadingBottom('');
    } else if (path === '/onboard/employee' && step === 'basic_information') {
      setSidePanelImage(OnboardBasicInfoImage);
      setSidePanelHeadingTop('');
      setSidePanelSubheadingTop('');
      setSidePanelHeadingBottom('Empowering Founders, Investors & Corporates');
      setSidePanelSubheadingBottom(
        'We support early-stage founders by providing access to industry expertise, functional knowledge, and marquee investor networks.'
      );
    } else if (path === '/onboard/employee' && step === 'contact_information') {
      setSidePanelImage(OnboardContactInfoImage);
      setSidePanelHeadingTop('');
      setSidePanelSubheadingTop('');
      setSidePanelHeadingBottom('Shaping the Future of Bharat with Purpose');
      setSidePanelSubheadingBottom(
        'By 2028, ~300mn consumers will move up to higher income groups, creating new market opportunities.'
      );
    } else if (path === '/onboard/employee' && step === 'emergency_contact_information') {
      setSidePanelImage(OnboardEmergencyContactinfoImage);
      setSidePanelHeadingTop('');
      setSidePanelSubheadingTop('');
      setSidePanelHeadingBottom('Leading with Insights, Backed by Market Trends');
      setSidePanelSubheadingBottom(
        '~900mn active internet users expected by 2025, with 56% coming from Tier 3+ cities.'
      );
    }
  }, [location.pathname, location.search]);

  return (
    <div className="flex w-screen gap-4 h-screen p-4 bg-background">
      {!shouldHideSidePanel && (
        <div className="w-1/3">
          <SidePanel
            logoSrc={logo}
            headingTop={sidePanelHeadingTop}
            subheadingTop={sidePanelSubheadingTop}
            headingBottom={sidePanelHeadingBottom}
            subheadingBottom={sidePanelSubheadingBottom}
            illustrationSrc={sidePanelImage}
          />
        </div>
      )}
      <div className="flex flex-grow flex-col justify-between items-center shadow-boxShadow rounded-3xl bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default OnBoard;
