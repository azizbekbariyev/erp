// src/hooks/useGeneral.ts

import { useNavigate } from "react-router-dom";
import type { PaginationConfig } from "@types";
import { useMutation, useQuery } from "@tanstack/react-query";
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

  const forgetPassword = () => {
    return useMutation({
      mutationFn: async (data: any) => Service.forgetPassword(data),
      onSuccess: () => {
        navigate("/verify-code-page")
      }
    })
  }

  const confirmOtp = () => {
    return useMutation({
      mutationFn: async (data: any) => Service.confirmOtp(data),
      onSuccess: ()=>{
        navigate("/reset-password")
      }
    })
  }

  const confirmPassword = () => {
    return useMutation({
      mutationFn: async (data: any) => Service.confirmPassword(data),
      onSuccess: () => {
        navigate("/")
      }
    })
  }
  
  return {
    data,
    information,
    handlePagination,
    forgetPassword,
    confirmPassword,
    confirmOtp,
  };
};

export default useGeneral;
