import { Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import { useParams, useOutletContext } from 'react-router-dom';
import CommonAssetsDisplay from './CommonAssetsDisplay';
import { useEffect, useState } from 'react';
import { Category } from '@/types';
import Skeleton from 'react-loading-skeleton';

interface OutletContext {
  categories: Category[];
}

const CategoryComponent = () => {
  const { categorySlug } = useParams();
  const { categories } = useOutletContext<OutletContext>();
  const [categoryId, setCategoryId] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const getCategoryName = (slug: string) => {
    return slug.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  useEffect(() => {
    if (!categorySlug || !categories) return;

    try {
      setIsLoading(true);
      const category = categories.find((cat: Category) => {
        const catSlug = cat.name.toLowerCase();
        return catSlug === categorySlug;
      });

      if (category) {
        setCategoryId(category.id);
        setCategoryName(category.name);
      } else {
        setCategoryName(getCategoryName(categorySlug));
      }
    } catch (error) {
      setCategoryName(getCategoryName(categorySlug));
    } finally {
      setIsLoading(false);
    }
  }, [categorySlug, categories]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Typography tag="h3" className="text-primary font-semibold">
          <Skeleton count={10} />
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {categoryId ? (
        <CommonAssetsDisplay
          categoryId={categoryId}
          categoryName={categoryName}
        />
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="border border-gray-v11 rounded-lg p-6 space-y-6">
            <div className="flex items-center justify-between">
              <Skeleton width={300} height={40} />
              <Skeleton width={120} height={40} />
            </div>

            {[1, 2, 3].map((categoryIndex) => (
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
        </div>
      )}
    </div>
  );
};

export default CategoryComponent; 