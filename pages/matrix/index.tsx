import * as React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { sessionModelInterface } from "../../src/models/sessionModel";
import axios from "axios";
import { topicInterface } from "../../src/components/topics/models/topic";
import { getWeights } from "../../src/components/matrix/helpers/getWeights";
import { Matrix } from "../../src/components/matrix/Matrix";
import { subjectInterface } from "../../src/components/Subjects/models/subject";

interface indexArgs {
  data: topicInterface[];
  dataSubject: subjectInterface[];
}

const index = ({ data, dataSubject }: indexArgs) => {
  const topics = getWeights(data);

  return (
    <Matrix
      dataSubject={dataSubject}
      topics={topics
        .sort((a, b) => a.weight - b.weight)
        .filter((e) => !e.complete)
        .reverse()}
    ></Matrix>
  );
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

  const resSubject = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/subjects/?user=${
      (session as sessionModelInterface).user.id
    }`
  );

  const dataSubject: subjectInterface[] = resSubject.data;

  return {
    props: { data, dataSubject },
  };
};

export default index;
