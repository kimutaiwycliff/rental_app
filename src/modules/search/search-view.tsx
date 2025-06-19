'use client';

import { NAVBAR_HEIGHT } from '@/lib/constants';
import { cleanParams } from '@/lib/utils';
import { setFilters } from '@/state/features/global';
import { useAppDispatch, useAppSelector } from '@/state/store';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FiltersBar } from './components/FilterBar';
import { FiltersFull } from './components/FiltersFull';
import Map from '@/components/map';

export const SearchView = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const isFiltersFullOpen = useAppSelector(
    (state) => state.global.isFiltersFullOpen
  );
  /**
   * This effect is responsible for initializing the filters state from the URL
   * query parameters.
   *
   * It runs only once, when the component is mounted.
   *
   * It takes the query parameters from the URL and transforms them into an object
   * that can be used to set the filters state.
   *
   * The transformation is done in the following way:
   * - If the key is `priceRange` or `squareFeet`, the value is split by commas and
   *   each part is converted to a number. If the part is empty, it is set to null.
   * - If the key is `coordinates`, the value is split by commas and each part is
   *   converted to a number.
   * - For any other key, the value is set to null if it is equal to 'any', or
   *   left as is otherwise.
   *
   * The resulting object is then cleaned up by removing any keys that have a
   * value of null or an empty string.
   *
   * Finally, the cleaned up object is used to set the filters state.
   */
  useEffect(() => {
    const initialFilters = Array.from(searchParams.entries()).reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (acc: any, [key, value]) => {
        if (key === 'priceRange' || key === 'squareFeet') {
          acc[key] = value.split(',').map((v) => (v === '' ? null : Number(v)));
        } else if (key === 'coordinates') {
          acc[key] = value.split(',').map(Number);
        } else {
          acc[key] = value === 'any' ? null : value;
        }

        return acc;
      },
      {}
    );

    const cleanedFilters = cleanParams(initialFilters);
    dispatch(setFilters(cleanedFilters));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div
      className="w-full mx-auto px-5 flex flex-col"
      style={{
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      <FiltersBar />
      <div className="flex justify-between flex-1 overflow-hidden gap-3 mb-5">
        <div
          className={`h-full overflow-auto transition-all duration-300 ease-in-out ${
            isFiltersFullOpen
              ? 'w-3/12 opacity-100 visible'
              : 'w-0 opacity-0 invisible'
          }`}
        >
          <FiltersFull />
        </div>
        <Map />
        {/* <div className="basis-4/12 overflow-y-auto"><Listings /></div> */}
      </div>
    </div>
  );
};
