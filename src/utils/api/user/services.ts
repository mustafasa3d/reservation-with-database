import {
  Reservation,
  ReservationForm,
  hotel,
  selectOption,
  userData,
  userLogin,
} from "@/types";

import Cookie from "js-cookie";
import axios from "../initAxios";
import { logout } from "../commanService";

export const fetchReservationsUser = async (
  username: string, // تم تصحيح نوع البيانات من "string" إلى string
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);

    // بناء رابط Firebase مع query parameters الصحيحة
    const firebaseUrl = `https://reservation-3b8ed-default-rtdb.firebaseio.com/reservations.json?orderBy="username"&equalTo="${username}"`;

    // إرسال طلب GET إلى Firebase
    const { data: responseData } = await axios.get(firebaseUrl);

    // تحويل البيانات إلى مصفوفة من الحجوزات
    const reservations = Object.entries(responseData || {}).map(([id, values]) => ({
      ...(values as Reservation),
      id, // إضافة الخاصية id
    }));

    // تحديث state بالحجوزات
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
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
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
