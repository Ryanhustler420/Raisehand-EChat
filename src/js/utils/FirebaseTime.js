import { Timestamp } from "../db/firestore";
import moment from "moment";

export const createTimeStamp = () =>
    Timestamp.now().toMillis().toString();

export const formatTimestamp = (timestamp) =>
    moment(parseInt(timestamp, 10)).fromNow();
