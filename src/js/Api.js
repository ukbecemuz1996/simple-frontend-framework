import { navigate } from "./Router.js";

// api base url
const BASE_API_URL = "https://jsonplaceholder.typicode.com";

// request function that used in all fetch methods
function request(
    endpoint,
    method,
    callback,
    catchError,
    body = {},
    params = {}
) {
    // an XMLHttpRequest is created 
    const xhr = new XMLHttpRequest();

    // xhr ready event
    xhr.onreadystatechange = function () {

        // check if is ready and response status is 200
        if (this.readyState == 4 && this.status == 200) {

            // parsing response text to json
            const json = JSON.parse(xhr.responseText);

            // invoke callback with response json
            callback(json);
        }
        // check if is ready but response status is not 200 
        else if (this.readyState == 4 && this.status !== 200) {

            // invoke error function with response status code 
            catchError(this.status);

            // check status code for errors
            switch (this.status) {
                case 500:
                    navigate("/500");
                    break;
                default:
                    navigate("/404");
                    break;
            }
        }
    };

    // xhr open connection by specifying method, url and async flag (true is async and false is sync)
    xhr.open(method, `${BASE_API_URL}${endpoint}`, true);

    // xhr set content type to application/json
    xhr.setRequestHeader("Content-Type", "application/json");

    // send the request
    xhr.send();
}

export function fetchUsers(callback, error) {
    request("/users", "GET", callback, error);
}

export function fetchUser(userId, callback, error) {
    request(`/users/${userId}`, "GET", callback, error);
}

export function fetchPosts(userId, callback, error) {
    request(
        userId ? `/users/${userId}/posts` : "/posts",
        "GET",
        callback,
        error
    );
}

export function fetchPost(postId, callback, error) {
    request(`/posts/${postId}`, "GET", callback, error);
}

export function fetchComments(postId, callback, error) {
    request(`/posts/${postId}/comments`, "GET", callback, error);
}

export function fetchAlbums(userId, callback, error) {
    request(
        userId ? `/users/${userId}/albums` : "/albums",
        "GET",
        callback,
        error
    );
}

export function fetchTodos(userId, callback, error) {
    request(`/users/${userId}/todos`, "GET", callback, error);
}

export function fetchAlbum(albumId, callback, error) {
    request(`/albums/${albumId}/photos`, "GET", callback, error);
}
