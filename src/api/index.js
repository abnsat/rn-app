export const getCategories = () => {
    const url = "http://vidmgr.abnvideos.com/api/categories";
    return fetch(url).then(response => response.json());
};

export const getChannels = () => {
    const url = "http://vidmgr.abnvideos.com/api/channels";
    return fetch(url).then(response => response.json());
};

export const getChannelItems = itemsUrl => {
    return fetch(itemsUrl).then(response => response.json());
};

export const getVideos = categoryId => {
    return fetch(`http://vidmgr.abnvideos.com/api/channels?category=${categoryId}`).then(response =>
        response.json(),
    );
};
