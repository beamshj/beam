import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
    metaTitle: {
        type: String,
        required: true
    },
    metaDescription: {
        type: String,
        required: true
    },
    bannerSection:{
        items:[{
            image: {
                type: String,
                required: true
            },
            imageAlt: {
                type: String,
            },
            title: {
                type: String,
                required: true
            },
            highlightText: {
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
    },
    thirdSection: {
        title: {
            type: String,
            required: true
        },
        description: {
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
        items: [{
            logo: {
                type: String,
                required: true
            },
            logoAlt: {
                type: String,
            },
            title: {
                type: String,
                required: true
            }
        }]
    },
    fourthSection: {
        title: {
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
        videoLink: {
            type: String,
            required: true
        }
    },
    fifthSection: {
        title: {
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
        items:[{
            logo: {
                type: String,
                required: true
            },
            logoAlt: {
                type: String,
            },
            number: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        }]
    },
    sixthSection: {
        mainTitle: {
            type: String,
            required: true
        },
        subTitle: {
            type: String,
            required: true
        },
        description: {
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
        name: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            required: true
        }
    },
    seventhSection: {
        title: {
            type: String,
            required: true
        },
        buttonText: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        items: [{
            image: {
                type: String,
                required: true
            },
            imageAlt: {
                type: String,
            },
            name: {
                type: String,
                required: true
            },
            course: {
                type: String,
                required: true
            }
        }]
    },
    eighthSection:{
        title:{
            type: String,
            required: true
        }
    },
    ninethSection:{
        items:[{
            image: {
                type: String,
                required: true
            },
            imageAlt: {
                type: String,
            }
        }]
    },
    tenthSection:{
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        image:{
            type: String,
            required: true
        },
        imageAlt:{
            type: String,
        },
        buttonText:{
            type: String,
            required: true
        }
    }
})

export default mongoose.models.Home || mongoose.model("Home", homeSchema);