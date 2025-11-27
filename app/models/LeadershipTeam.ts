import mongoose from "mongoose";

const leadershipTeamSchema = new mongoose.Schema({
    banner: {
        type: String,
        required: true
    },
    bannerAlt: {
        type: String,
    },
    metaTitle: {
        type: String,
        required: true
    },
    metaDescription: {
        type: String,
        required: true
    },
    pageTitle: {
        type: String,
        required: true
    },
    firstSection: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        items: [{
            name: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            imageAlt: {
                type: String,
            },
            designation: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }]
    },
    secondSection: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        items: [{
            name: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            imageAlt: {
                type: String,
            },
            designation: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }]
    },
})

export default mongoose.models.LeadershipTeam || mongoose.model("LeadershipTeam", leadershipTeamSchema);