import { topicInterface } from '../../topics/models/topic';
import { topicWeight } from '../models/topicWeight';
import { subjectInterface } from '../../Subjects/models/subject';


export const getWeights = (topics: topicInterface[]): topicWeight[] => {
    return topics.map(topic => {
        let urgent: number = 1;
        let important: number = 3;

        if (topic.important !== 'importante')
            important = 1;

        if (topic.urgent === 'urgente')
            urgent = 0;

        const topicWeight: topicWeight = {
            ...topic, weight: important + urgent
        }
        return topicWeight;
    })
}