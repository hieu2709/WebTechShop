const avatarBaseURL = "a";

const ImageHelper = {
    getUrlImage: (imgPath: string): string => {
        return avatarBaseURL + "/" + imgPath;
    },
    getTextAvatar: (first: string, last: string) => {
        return first[0] + last[0];
    },
};

export default ImageHelper;
