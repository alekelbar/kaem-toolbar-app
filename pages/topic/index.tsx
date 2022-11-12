import React from "react";
import { Topics } from "src/components/topics/Topics";
import { GetServerSideProps } from "next";
import axios from "axios";
import { topicInterface } from "src/components/topics/models/topic";
import { sessionModelInterface } from "src/models/sessionModel";
import { getSession } from "next-auth/react";

const index = ({ data }: { data: topicInterface[] }) => {
  return <Topics data={data} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  const id = (session as sessionModelInterface).user.id;

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/topics`, {
    params: { user: id },
  });

  const data: topicInterface[] = res.data;

  return {
    props: { data },
  };
};

export default index;
