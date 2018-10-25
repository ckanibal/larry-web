// containers/UploadBlueprint.js


import moment from "moment";

export default {
    title: "Title",
    lead: "Short description",
    description: "Long description",
    author: {
        username: "anon",
    },
    tags: [],
    files: [],
    createdAt: moment(new Date()).add(5,'minutes').toISOString(),
    updatedAt: moment(new Date()).add(1,'day').toISOString(),
    voting: {
        sum: 0,
    },
    comments: {
        count: 0,
        items: [],
    },
};