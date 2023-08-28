import Alert from "../Common/Alert.js";
import Component from "../Common/Component.js";

function Footer() {
    // inherit component constructor
    Component.call(this);

    // component render function
    this.render = function () {
        return `
            <footer>
                <div class="hint">
                    <p>
                        <span>API: </span>
                        <a href="https://jsonplaceholder.typicode.com/">JSONPlaceholder</a><br/>
                        <span>Thanks To: </span>
                        <a href="http://willsentance.com/">Will Sentace</a>
                    </p>
                </div>
                <div class="social">
                    <a href="https://github.com/ukbecemuz1996">
                        <i class="ph ph-github-logo"></i>
                    </a>
                </div>
                ${new Alert().render()}
            </footer>
        `;
    };
}

// inherit prototype from component
Footer.prototype = Object.create(Component.prototype);
Footer.prototype.constructor = Footer;
export default Footer;
