import React from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { subjectInterface } from "../../src/components/Subjects/models/subject";
import { useRouter } from "next/router";
import { EditSubjectForm } from "src/components/Subjects/EditForm";

const id = ({ data }: { data: subjectInterface }) => {
  return <EditSubjectForm data={data} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/subjects/one/${context.query.id}`
  );

  const data: subjectInterface = res.data;

  return {
    props: { data },
  };
};

export default id;
