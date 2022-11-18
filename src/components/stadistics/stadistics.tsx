import styles from "./stadistics.module.css";
import { topicInterface } from "../topics/models/topic";
import { Stack } from "@mui/system";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";

ChartJS.register(CategoryScale);

export const Stadistics = ({ data: topics }: { data: topicInterface[] }) => {
  const completes = topics.filter((e) => e.complete).length;
  const incompletes = topics.filter((e) => !e.complete).length;

  const dataSet = {
    labels: ["Completadas", "Incompletadas"],
    datasets: [
      {
        label: "Estado actual de rendimiento",
        data: [completes, incompletes],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <Stack className={styles.stadistics}>
      <Bar className={styles.stadistics_container} data={dataSet} />
    </Stack>
  );
};
