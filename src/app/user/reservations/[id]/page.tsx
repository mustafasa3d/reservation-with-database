import Header from "@/components/Header";
import SingleReservationView from "@/components/SingleReservationView";
import { getSingleData } from "@/utils/api/commanService";

type Props = {
  params: Promise<{ id: string | any }>;
};

async function SingleReservation({ params }: Props) {
  const { id } = await params;
  const reservationData = await getSingleData(`reservations/${id}`);
  reservationData.id = id;
  return (
    <>
      <Header
        title={`Reservation id: ${id}`}
        btnInfo={{ href: "/user", text: "See All Reservations" }}
      />

      <SingleReservationView reservation={reservationData} />
    </>
  );
}

export default SingleReservation;
