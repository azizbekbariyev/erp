// src/hooks/useGeneral.ts

import { useNavigate } from "react-router-dom";
import type { PaginationConfig } from "@types";
import { useQuery } from "@tanstack/react-query";
import { Service } from "../service/general.service";

export const useGeneral = () => {
  const navigate = useNavigate();

  const handlePagination = ({ pagination, setParams }: PaginationConfig) => {
    const { current, pageSize } = pagination;

    setParams({
      page: current!,
      limit: pageSize!,
    });

    const searchParams = new URLSearchParams();
    searchParams.set("page", String(current));
    searchParams.set("limit", String(pageSize));

    navigate({
      search: `?${searchParams.toString()}`,
    });
  };

  const information = useQuery({
    queryKey: ["information"],
    queryFn: async () => Service.getInformationProfile(),
  })

  const data = information.data?.data;
  
  return {
    data,
    handlePagination,
  };
};

export default useGeneral;
