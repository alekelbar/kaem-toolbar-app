import React from "react";
import { Topics } from "src/components/topic/Topics";
import { GetServerSideProps } from "next";
import axios from "axios";
import { topicInterface } from "src/components/topic/models/topic";

const index = ({ data }: { data: topicInterface[] }) => {
  return <Topics data={data} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // petición para la data de los topics
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/topics`);
  const data: topicInterface[] = res.data;

  return {
    props: { data },
  };
};

export default index;
