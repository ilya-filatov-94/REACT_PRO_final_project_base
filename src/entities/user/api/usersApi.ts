import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from '../../../shared/api/config';

export interface IErrorResponse {
	data: { statusCode: number; message: string; error: string };
	status: number;
}

export const usersApi = createApi({
	reducerPath: 'usersApi',
	baseQuery: customBaseQuery,
	tagTypes: ['User'],
	endpoints: (builder) => ({
		getUser: builder.query<User, void>({
			query: () => {
				return {
					url: '/users/me',
				};
			},
			providesTags: [{ type: 'User' }],
		}),
		updateUser: builder.mutation<User, ProfileFormValues>({
			query: (data) => ({
				url: '/users/me',
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: (result, error) => (error ? [] : ['User']),
		}),
	}),
});

export const { useGetUserQuery, useUpdateUserMutation } = usersApi;
