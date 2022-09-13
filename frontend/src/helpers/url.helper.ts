const staticVase = "http://localhost:8000";

const UrlHelper = {
    getStaticUrl: (url: string | null): string => {
        if (!url) return "";
        return staticVase + url;
    },
};
export default UrlHelper;
