class Defer {

    constructor() {
        this.loaderDuration = 1500;
        this.loaderDelay = 0;
    }

    addClass = (element, className) => {
        if(element.classList) element.classList.add(className);
        else element.className += className;
    }

    init = (tasks) => {
        tasks.forEach(task => {
            this.loadScript(task.url, task.callback);
        });
    }

    removeLoader = () => {
        this.rootLoader = document.getElementById('rootLoader');
        this.rootLoaderImg = this.rootLoader.getElementsByTagName('img')[0];
        //console.log('start waiting');
        setTimeout(() => {
            //console.log('start animation');
            this.rootLoader.style.animationDuration = `${this.loaderDuration/1000}s`;
            this.rootLoaderImg.style.animationDuration = `${this.loaderDuration/1000/1.5}s`;
            this.addClass(this.rootLoader, 'rootLoader--off');
            setTimeout(() => {
                //console.log('Delete now!');
                this.rootLoader.parentNode.removeChild(this.rootLoader);
            }, this.loaderDuration)
        }, this.loaderDelay)
    }

    loadScript = (url, completeCallback) => {
        let script = document.createElement('script'), done = false,
            head = document.getElementsByTagName("head")[0];
        script.src = url;
        script.onload = script.onreadystatechange = function(){
            if ( !done && (!this.readyState ||
                this.readyState === "loaded" || this.readyState === "complete") ) {
                done = true;
                completeCallback();
                script.onload = script.onreadystatechange = null;
                head.removeChild( script );
            }
        };
        head.appendChild(script);
    }

}

let defer_instance = new Defer();

defer_instance.init([
    {
        url: '/js/boundle.js',
        callback: () => {
            //console.log('boundle loaded');
            defer_instance.removeLoader();
        }
    },
    // {
    //     url: 'https://www.google.com/recaptcha/api.js',
    //     callback: () => {
    //         //console.log('captcha has loaded');
    //     }
    // }
]);


