import { Reservation } from "@/types";
import axios from "../initAxios";

export const fetchReservationsUser = async (
  username: string,
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);

    const firebaseUrl = `https://reservation-3b8ed-default-rtdb.firebaseio.com/reservations.json?orderBy="username"&equalTo="${username}"`;

    const { data: responseData } = await axios.get(firebaseUrl);

    const reservations = Object.entries(responseData || {}).map(
      ([id, values]) => ({
        ...(values as Reservation),
        id,
      })
    );

    setReservations(reservations);
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
  } finally {
    setLoading(false);
  }
};

/* ( cancel only ) reservation */
export const cancelReservation = async (
  id: string,
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const data = await axios.delete(`/reservations/${id}.json`);
    if (data?.status === 200) {
      setReservations((prev) =>
        prev.filter((reservation) => reservation.id !== id)
      );
    }
  } catch (error) {
    console.error("Failed to update reservation:", error);
  } finally {
    setLoading(false);
  }
};

/* -------------------------------------------------------------------------------------------- */
