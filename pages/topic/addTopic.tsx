import { GetServerSideProps } from "next";
import React from "react";
import { AddTopicForm } from "../../src/components/topics/addForm";
import { getSession } from "next-auth/react";
import axios from "axios";
import { sessionModelInterface } from "src/models/sessionModel";
import { subjectInterface } from "../../src/components/Subjects/models/subject";

export const addTopic = ({ data }: { data: subjectInterface[] }) => {
  return <AddTopicForm data={data} />;
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
    props: { data },
  };
};

export default addTopic;
