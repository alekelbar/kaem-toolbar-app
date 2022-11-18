import { topicInterface } from '../../topics/models/topic';
interface Weight {
    weight: number,
}

export type topicWeight = topicInterface & Weight;
