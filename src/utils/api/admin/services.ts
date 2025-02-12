import { Reservation } from "@/types";
import axios from "../initAxios";

export const fetchReservationsAdmin = async (
  searchParamsData: URLSearchParams,
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);

    const searchParams = Object.fromEntries(searchParamsData.entries());

    const queryParams = [];
    if (searchParams?.status) {
      queryParams.push(`orderBy="status"&equalTo="${searchParams.status}"`);
    }
    if (searchParams?.hotelName) {
      queryParams.push(`orderBy="hotel"&equalTo="${searchParams.hotelName}"`);
    }
    if (searchParams?.userName) {
      queryParams.push(`orderBy="username"&equalTo="${searchParams.userName}"`);
    }

    let endPoint = "reservations.json";

    if (queryParams.length > 0) {
      endPoint += `?${queryParams.join("&")}`;
    }

    const { data: responseData } = await axios.get(endPoint);

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

/* (approve | cancel | delete) reservation */
export const handleUpdateReservation = async (
  id: string,
  status: string,
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  message?: string
) => {
  setLoading(true);
  try {
    if (status === "deleted") {
      /* if (status === 'deleted') */
      const data = await axios.delete(`/reservations/${id}.json`);

      if (data?.status === 200) {
        setReservations((prev) =>
          prev.filter((reservation) => reservation.id !== id)
        );
      }
    } else {
      /* if (status === 'cancelled' || status === 'approved') */
      const DataToUpdate = { status: status, message: message || null };

      const data = await axios.patch(`/reservations/${id}.json`, DataToUpdate);

      if (
        data?.data?.status === "cancelled" ||
        data?.data?.status === "approved"
      ) {
        setReservations(
          (prev) =>
            prev.map((reservation) =>
              reservation.id === id
                ? { ...reservation, status: status }
                : reservation
            ) as Reservation[]
        );
      }
    }
  } catch (error) {
    console.error("Failed to update reservation:", error);
  } finally {
    setLoading(false);
  }
};

/* -------------------------------------------------------------------------------------------- */
