import getCurrentUser from '@/actions/getCurrentUser';
import getListingById from '@/actions/getListingById';
import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';
import ListingClient from './ListingClient';
import getReservations from '@/actions/getReservations';

interface Iparams {
  listingId: string;
}
const ListenPage = async ({ params }: { params: Iparams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return <EmptyState showReset />;
  }
  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
};

export default ListenPage;
