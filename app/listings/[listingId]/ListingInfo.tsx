'use client';

import { IconType } from 'react-icons';
import dynamic from 'next/dynamic';

import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';

import Avatar from '@/app/components/Avatar';
import ListingCategory from '@/app/components/listings/ListingCategory';

const Map = dynamic(() => import('@/app/components/Map'), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div className='text-xl font-semibold flex flex-row items-center gap-2'>
          <div>Hosted By {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
          <div>
            {guestCount} {guestCount > 1 ? 'Guests' : 'Guest'}
          </div>
          <div>
            {roomCount} {roomCount > 1 ? 'Rooms' : 'Room'}
          </div>
          <div>
            {bathroomCount} {bathroomCount > 1 ? 'Bathrooms' : 'Bathroom'}
          </div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className='text-lg font-light text-neutral-500'>{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};
export default ListingInfo;