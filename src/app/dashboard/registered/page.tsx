"use client";
import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_REGISTRATIONS = gql`
  query GetRegistrations {
    getRegistrations {
      id
      name
      email
      phone
      course
      date
      time
    }
  }
`;

const Registered = () => {
  const { data, loading, error } = useQuery(GET_REGISTRATIONS);

  if (loading) return <p>Բեռնվում է...</p>;
  if (error) return <p>Սխալ: {error.message}</p>;

  return (
    <div className="p-6 overflow-scroll">
      <h1 className="text-xl font-bold mb-4">Գրանցվածների Ցանկ</h1>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Անուն</th>
            <th className="p-2 border">Էլ․ հասցե</th>
            <th className="p-2 border">Հեռախոս</th>
            <th className="p-2 border">Դասընթաց</th>
            <th className="p-2 border">Օր</th>
            <th className="p-2 border">Ժամ</th>
          </tr>
        </thead>
        <tbody>
          {data.getRegistrations.map(
            (reg: {
              id: string;
              name: string;
              email: string;
              phone: string;
              course: string;
              date: string;
              time: string;
            }) => (
              <tr
                key={reg.id}
                className="border-b hover:bg-gray-50">
                <td className="p-2 border">{reg.name}</td>
                <td className="p-2 border">{reg.email}</td>
                <td className="p-2 border">{reg.phone}</td>
                <td className="p-2 border">{reg.course}</td>
                <td className="p-2 border">{reg.date}</td>
                <td className="p-2 border">{reg.time}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Registered;
