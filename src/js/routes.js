import Page404 from "./Pages/404.js";
import Page500 from "./Pages/500.js";
import Album from "./Pages/Album.js";
import Albums from "./Pages/Albums.js";
import Home from "./Pages/Home.js";
import Post from "./Pages/Post.js";
import Posts from "./Pages/Posts.js";
import Todos from "./Pages/Todos.js";
import User from "./Pages/User.js";
import Users from "./Pages/Users.js";

const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/users",
        component: Users,
    },
    {
        path: "/users/:userid",
        component: User,
    },
    {
        path: "/users/:userid/posts",
        component: Posts,
    },
    {
        path: "/users/:userid/albums",
        component: Albums,
    },
    {
        path: "/users/:userid/todos",
        component: Todos,
    },
    {
        path: "/posts",
        component: Posts,
    },
    {
        path: "/posts/:postid",
        component: Post,
    },
    {
        path: "/albums",
        component: Albums,
    },
    {
        path: "/albums/:albumid",
        component: Album,
    },
    {
        path: "/404",
        component: Page404,
    },
    {
        path: "/500",
        component: Page500,
    },
];

export default routes;
