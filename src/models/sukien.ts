import { getSuKienUserByNam } from '@/services/sukien/sukien';
import { useState } from 'react';

export default () => {
  const [danhSachSuKien, setDanhSachSuKien] = useState<SuKien.Record[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getSuKienSinhVienByNamModel = async (year: number) => {
    setLoading(true);
    const response = await getSuKienUserByNam(year);
    setDanhSachSuKien(response?.data?.data ?? []);
    setLoading(false);
  };

  return { danhSachSuKien, setDanhSachSuKien, loading, getSuKienSinhVienByNamModel };
};
