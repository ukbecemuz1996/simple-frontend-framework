import Component from "../Common/Component.js";

function Home() {
    // inherit component constructor
    Component.call(this);

    // home navigations
    const navs = [
        { title: "Users", icon: `<i class="ph ph-user"></i>`, path: "/users" },
        {
            title: "Posts",
            icon: `<i class="ph ph-note-blank"></i>`,
            path: "/posts",
        },
        {
            title: "Albums",
            icon: `<i class="ph ph-images"></i>`,
            path: "/albums",
        },
    ];

    // render navigations in seperated function 
    function renderNavigations(navs = []) {
        return navs.mapJoin(function (nav, index) {
            const condition = navs.length == index + 1 && (index + 1) % 2 !== 0;
            return `
                <div class="${condition ? 'col-12' : 'col-6'}">
                    <div class="navigation click-bhvr">
                        <a href="${nav.path}">
                            <span>${nav.title}</span>
                            ${nav.icon}
                        </a>
                    </div>
                </div>
            `;
        });
    }

    // component render function
    this.render = function () {
        return `
            <div id="${this.id}" class="page home">
                <div class="navigations">

                    <div class="row">
                        ${renderNavigations(navs)}
                    </div>
                </div>
            </div>
        `;
    };
}

// inherit prototype from component
Home.prototype = Object.create(Component.prototype);
Home.prototype.constructor = Home;

export default Home;
