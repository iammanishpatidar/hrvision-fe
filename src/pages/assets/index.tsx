import {
  AssetsIcon,
  Button,
  CalendarTabIcon,
  CustomIcon,
  FileIcon,
  Settings,
  Tab,
  Tabs,
  Training,
  Typography,
  UserIcon,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { CategoryService } from '@/apis/services/CategoryService';
import { Category } from '@/types';
import { useEmployeeStore } from '@/store/employee-store';
import Skeleton from 'react-loading-skeleton';


const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();

  switch (name) {
    case 'hardware':
      return <UserIcon height="16" width="16" />;
    case 'software':
      return <CustomIcon height="16" width="16" />;
    case 'maintenance':
      return <Settings height="16" width="16" />;
    case 'development':
      return <CustomIcon height="16" width="16" />;
    case 'research':
      return <FileIcon height="16" width="16" />;
    case 'training':
      return <Training height="16" width="16" />;
    case 'support':
      return <AssetsIcon height="16" width="16" />;
    case 'services':
      return <CalendarTabIcon height="16" width="16" />;
    case 'miscellaneous':
      return <AssetsIcon height="16" width="16" />;
    case 'consulting':
      return <CustomIcon height="16" width="16" />;
    default:
      return <AssetsIcon height="16" width="16" />;
  }
};

const getCategorySlug = (categoryName: string) => {
  return categoryName.toLowerCase().replace(/\s+/g, '-');
};


const Assets = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || '0';
  const [activeTabIndex, setActiveTabIndex] = useState(parseInt(tab));
  const [isLoading, setIsLoading] = useState(true);
  const { categories, setCategories } = useEmployeeStore();
  const navigate = useNavigate();

  const sortedCategories = categories
    .slice()
    .sort((a: Category, b: Category) => a.name.localeCompare(b.name));

  const tabs = sortedCategories.map((category: Category) => ({
    label: category.name
      .replace(/_/g, ' ')
      .replace(/^\d+\./, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase()),
    labelIcon: getCategoryIcon(category.name),
    value: `/assets/${getCategorySlug(category.name)}`,
  }));

  const handleTabChange = (index: number, tab: Tab) => {
    setActiveTabIndex(index);
    navigate(`${tab.value}?tab=${index}`);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await CategoryService.fetchCategories();
        const categoriesData = response?.data?.categories || [];
        setCategories(categoriesData);

        if (categoriesData.length > 0 && window.location.pathname === '/assets') {
          const sortedCategories = categoriesData
            .slice()
            .sort((a: Category, b: Category) => a.name.localeCompare(b.name));
          const firstCategory = sortedCategories[0];
          const firstCategorySlug = getCategorySlug(firstCategory.name);
          navigate(`/assets/${firstCategorySlug}?tab=0`);
        }
      } catch (error) {
        // Error handling for category fetch
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="border border-gray-v11 rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton width={300} height={40} />
          <Skeleton width={120} height={40} />
        </div>

        {[1, 2].map((categoryIndex) => (
          <div key={categoryIndex}>
            <Skeleton width={150} height={24} className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((assetIndex) => (
                <div key={assetIndex} className="bg-white border border-gray-200 rounded-lg p-6">
                  <Skeleton height={20} count={4} className="mb-2" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col px-10 pb-10">
      <div className="flex items-center justify-between">
        <Typography tag="h2" className="capitalize text-primary font-semibold">
          My Assets
        </Typography>
        <div className="flex items-center gap-4">
          <Button variant="primary" size="medium" className="!rounded-2xl">
            Active
          </Button>
          <Button variant="primary" size="medium" className="!rounded-2xl">
            Request Asset
          </Button>
        </div>
      </div>

      <Tabs tabs={tabs} activeIndex={activeTabIndex} onChange={handleTabChange}>
        <div className="my-5">
          <Outlet context={{ categories }} />
        </div>
      </Tabs>
    </div>
  );
};

export default Assets;
