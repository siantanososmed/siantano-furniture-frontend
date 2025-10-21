import { queryOptions } from "@tanstack/react-query";
import browserHttpClient from "@/lib/client-http";

type GetJobsParams = {
  query?: string;
  pagination?: {
    page?: number;
    pageSize?: number;
  };
};
export async function getJobs({ query, pagination }: GetJobsParams) {
  const filter = {
    filters: {
      $and: [
        {
          position: {
            $containsi: query,
          },
        },
        {
          jobStatus: {
            $eqi: "Open",
          },
        },
      ],
    },
  };

  const response = await browserHttpClient.get<PaginatedResponseDto<JobDto>>(
    `${process.env.NEXT_PUBLIC_API_URL}/jobs`,
    {
      params: {
        ...filter,
        pagination: {
          pageSize: 5,
          page: pagination?.page || 1,
        },
      },
    }
  );

  return response.data;
}

export const careersQueryOptions = (params: GetJobsParams) =>
  queryOptions({
    queryKey: ["careers", params],
    queryFn: ({ queryKey }) =>
      getJobs({
        ...(queryKey[1] as GetJobsParams),
      }),
  });
