import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";
import { subjectInterface } from "src/components/Subjects/models/subject";
import { Subjects } from "../../src/components/Subjects/Subjects";
import { getSession } from "next-auth/react";
import { sessionModelInterface } from "../../src/models/sessionModel";

const index = ({ data }: { data: subjectInterface[] }) => {
  return <Subjects data={data} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/subjects/?user=${
      (session as sessionModelInterface).user.id
    }`
  );

  const data: subjectInterface[] = res.data;

  return {
    props: {
      data,
    },
  };
};

export default index;
