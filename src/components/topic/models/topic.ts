
interface tagsInterface {
    important: string;
    urgent: string;
}


export interface topicInterface {
    _id: string
    subjectId: string,
    name: string,
    descr: string,
    deadline: string,
    tags: tagsInterface
}