import { Stadistics } from "../../src/components/stadistics/stadistics";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { sessionModelInterface } from "../../src/models/sessionModel";
import axios from "axios";
import { topicInterface } from "../../src/components/topics/models/topic";

const index = ({ data }: { data: topicInterface[] }) => {
  return <Stadistics data={data} />;
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
