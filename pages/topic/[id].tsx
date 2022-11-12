import React from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { topicInterface } from "../../src/components/topics/models/topic";
import { subjectInterface } from "../../src/components/Subjects/models/subject";
import { useRouter } from "next/router";
import { sessionModelInterface } from "src/models/sessionModel";
import { getSession } from "next-auth/react";
import { EditTopicForm } from "../../src/components/topics/EditForm";

interface editTopicArgs {
  data: topicInterface;
  data_subjects: subjectInterface[];
}

const id = ({ data, data_subjects }: editTopicArgs) => {
  return <EditTopicForm data={data} data_subjects={data_subjects} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  let id: string = (session as sessionModelInterface).user.id;

  const res_allSubjects = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/subjects/?user=${id}`
  );
  const data_subjects: subjectInterface[] = res_allSubjects.data;

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/topics/one/${context.query.id}`
  );
  const data: topicInterface = res.data;

  return {
    props: { data, data_subjects },
  };
};

export default id;
