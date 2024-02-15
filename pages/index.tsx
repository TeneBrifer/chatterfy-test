import Head from "next/head";
import { useState } from "react";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Catalog from "../components/Catalog";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import UsersDTO from "@/dto/UsersDTO";

export const getServerSideProps = (async () => {
  // Получаем данные с нашего API
  const res = await fetch('http://localhost:3000/api/getUsers')
  const usersData: UsersDTO[] = await res.json()
  // Передаем через props
  return { props: { usersData } }
}) satisfies GetServerSideProps<{ usersData: UsersDTO[] }>

export default function Home({
  usersData,
}: InferGetServerSidePropsType<typeof getServerSideProps>)  {

  const [usersDataNew, setUsersDataNew] = useState<UsersDTO[]>(usersData);
  
  return (
    <>
        <Catalog usersData={usersDataNew}/>
    </>
  );
}
