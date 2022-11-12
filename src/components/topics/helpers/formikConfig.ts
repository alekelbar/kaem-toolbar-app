import * as yup from 'yup'
import dayjs from 'dayjs';

export const initialTopic = {
    name: "",
    subjectId: "",
    descr: "",
    deadline: dayjs().add(1, 'd').format("YYYY-MM-DD"),
    important: "importante",
    urgent: "urgente",
};

export const validationTopic = yup.object({
    name: yup.string().required('El nombre es requerido'),
    subjectId: yup.string().required('La asignatura es requerida'),
    descr: yup.string().required('La descripción es requerida'),
    deadline: yup.date().required('La fecha limite es requerida').min(dayjs().add(1, 'd').format("YYYY-MM-DD"), 'Al menos debe haber un díá de diferencia'),
    important: yup.string().required('Esta etiqueta es requerida'),
    urgent: yup.string().required('Esta etiqueta es requerida'),
});