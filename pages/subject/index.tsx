import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";
import { subjectInterface } from "src/components/Subjects/models/subject";
import { Subjects } from "../../src/components/Subjects/Subjects";

const index = ({ data }: { data: subjectInterface[] }) => {
  return <Subjects data={data} />;
};

export const getServerSideProps: GetServerSideProps = async (_) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/subjects`);
  const data: subjectInterface[] = res.data;

  return {
    props: {
      data,
    },
  };
};

export default index;
