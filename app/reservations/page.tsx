import getCurrentUser from '@/actions/getCurrentUser';
import getReservations from '@/actions/getReservations';
import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';
import ReservationsClient from './ReservationsClient';

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  const reservations = await getReservations({
    authorId: currentUser.id,
  });
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you havent reserved any trips"
      />
    );
  }
  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
};

export default ReservationPage;
