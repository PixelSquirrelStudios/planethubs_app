import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import TripsClient from "./TripsClient";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

const TripsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title='Unauthorized'
          subtitle="Please Login"
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({
    userId: currentUser.id
  })

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No Trips Found'
          subtitle="Looks Like You Haven't Reserved Any Trips"
        />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <TripsClient 
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}

export default TripsPage