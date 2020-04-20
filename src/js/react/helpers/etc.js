import React from 'react';
import lozad from 'lozad';
import renderHTML from 'react-render-html';
import { Cookies } from 'react-cookie';
import { VALID_GET_PARAMS, ENV } from './constants';
//import { P } from '../primitives';

//const API_PREFIX = '/proxy';
//const API_PREFIX = '';
//const API_PREFIX = process.env.API_PREFIX;

export function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") fn();
    else document.addEventListener('DOMContentLoaded', fn);
}

export function loadImages() {
    const observer = lozad('.lozad', {
        loaded: function(el) {
            el.classList.add('lozad--loaded');
            //el.style.backgroundImage = `url(${el.getAttribute('data-background-image')})`;
        }
    });
    observer.observe();
}

export function scrollTo(y, duration) {
    let initialY = document.documentElement.scrollTop || document.body.scrollTop;
    let baseY = (initialY + y) * 0.5;
    let difference = initialY - baseY;
    let startTime = performance.now();
    function step() {
        let normalizedTime = (performance.now() - startTime) / duration;
        if (normalizedTime > 1) normalizedTime = 1;
        window.scrollTo(0, baseY + difference * Math.cos(normalizedTime * Math.PI));
        if (normalizedTime < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

export function addClass(element, className) {
    if(element.classList) element.classList.add(className);
    else element.className += className;
}

export function removeClass(element, className) {
    if(element.classList) element.classList.remove(className);
    else {
        let classNames = element.className.split(' '),
            index = classNames.indexOf(className);
        classNames.splice(index, 1);
        element.className = classNames.join(' ');
    }
}

export function hasClass(element, className) {
    return element.classList ? element.classList.contains(className) : element.className.split(' ').indexOf(className) >= 0;
}

export function importAll(r) {
    return r.keys().map(r);
}

export function getViewportSize() {
    let e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

export function outerHeight(el) {
    let height = el.offsetHeight;
    let style = getComputedStyle(el);
    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
}

export function apiRequest(method, url, body) {
    return fetch(`${ENV.API_PREFIX}/${url}`, {
        method,
        credentials: "include",
        body
    }).then(response => {
        if (response.status !== 200) {
            throw Error(`Unexpected server response code: ${response.status} - ${response.statusText}`);
        }
        return response.text();
    })
}

export function apiGet(module, args={}) {
    const url = `${module}?${Object.keys(args)
        .map((key) => `${key}=${encodeURIComponent(args[key])}`)
        .join('&')
        }`;
    return apiRequest('GET', url);
}

export function apiPost(module, args={}) {
    const body = new FormData();
    Object.keys(args).forEach(key => {
        body.append(key, args[key]);
    });
    return apiRequest('POST', module, body);
}

export function dateParse(data) {
    let date = new Date(data);
    return {
        year: date.getFullYear(),
        month: date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1,
        day: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
    }
}

export function trim(e) {
    if (!(e === "" || e === null || e === void 0)) {
        return e.replace(/^\s+/, "").replace(/\s+$/, "");
    } else {
        throw new Error("Please specify an argument!");
    }
};

export function stripTags(e) {
    let _hasTag, _tag_string;
    if (!(e === void 0 || e === null || e === "")) {
        _tag_string = e;
        if (typeof _tag_string === "object") {
            _tag_string = _tag_string.outerHTML;
        }
        _hasTag = _tag_string.match(/(<([^>]+)>)/ig);

        if (_hasTag) {
            return trim(_tag_string.replace(/(<([^>]+)>)/ig, ''));
        } else {
            return trim(_tag_string);
        }
    }
    else {
        throw new Error("The 'strip_tags' function expects one argument in the form of a string or object.");
    }
};

export const MONTH = [
    'Янв.',
    'Фев.',
    'Мар.',
    'Апр.',
    'Май.',
    'Июн.',
    'Июл.',
    'Авг.',
    'Сен.',
    'Окт.',
    'Ноя.',
    'Дек.',
];

export function cutText(text, limit) {
    if (text.length > limit) {
        for (let i = limit; i > 0; i--) {
            if (text.charAt(i) === ' ' && (text.charAt(i - 1) !== ',' || text.charAt(i - 1) !== '.' || text.charAt(i - 1) !== ';')) {
                return text.substring(0, i) + '...';
            }
        }
    } else {
        return text;
    }
};

export function removeStyles(text) {
    return renderHTML(renderHTML(text).replace(/ style="[^"]*"/gm, ''));
}

// export function replaceHtmlWithComponent(text_array) {
//     let text = [];
//     text_array.forEach((row, index) => {
//         if(row) {
//             let { type, props } = row;
//             if(props) {
//                 let content = props.children[0];
//                 if(type === 'p' && typeof content === 'string') {
//                     text.push(<P key={index}>{content}</P>);
//                 }
//             }
//         }
//     });
//     return text;
// }

export function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    //name = name.replace(/[\[\]]/g, '\\$&');
    name = name.replace(/[[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function getGetParams() {
    let params = {};
    VALID_GET_PARAMS.forEach(param => {
        let test = getParameterByName(param);
        if(test) {
            params[param] = parseInt(test)
        }
    });
    return params;
}

export function moveArrayItem(arr, item, toIndex) {
    if(arr && arr.length) {
        let fromIndex = arr.indexOf(item);
        if(fromIndex !== -1) {
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, item);
        }
    }
}

export function buildUrl(newParams) {
    let params = {...getGetParams(), ...newParams};
    let data = Object.keys(params);
    moveArrayItem(data, 'category', 0);
    let url = '';
    data.forEach((param, index) => {
        url += index === 0 ? '?' : '';
        url += `${[param]}=${params[param]}`;
        url += data[index+1] ? '&' : '';
    });
    return url;
}

export async function graphqlQuery (query, variables={}) {
    const response = await fetch(`${ENV.API_PREFIX}/api/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: new Cookies(document.cookie).get('session_key'),
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });
    if (response.status !== 200) {
        throw Error(`Unexpected HTTP response code: ${response.status} - ${response.statusText}`);
    }
    const result = await response.json();
    //console.log(result);
    if ((result.errors || []).length) {
        // TODO: advanced errors
        //throw Error(`Graphql Errors: ${result.errors.map(({message}) => message).join(', ')}`);
        return {errors: result.errors}
    }
    return result.data;
};

export function ObjToGraphParams(obj) {
    let str = '';
    let keys = Object.keys(obj);
    if(keys.length) {
        str += '(';
    }
    keys.forEach((key, index) => {
        str += `${key}: ${obj[key]}`;
        str += keys[index+1] ? ', ' : '';
    });
    str += ')';
    return str;
}

export function objFilter(obj, rule) {
    let obj_arr = Object.keys(obj);
    let filtered_arr = obj_arr.filter(val => rule(val));
    //let filtered_obj = filtered_arr.reduce((total, el) => (total[el] = obj[el], total), {});
    let filtered_obj = filtered_arr.reduce((total, el) => {
        total[el] = obj[el];
        return total;
    }, {});
    return filtered_obj;
}

export async function loadServerImage($path, callback) {
    let path_full = `${ENV.API_PREFIX}/${$path}`;
    let request = new Request(path_full);
    let response = await fetch(request);
    if(response.status === 200) {
        let blob = await response.blob();
        let image_hash = await URL.createObjectURL(blob);
        callback(image_hash);
    } else throw new Error(`Image ${path_full} wasn't found on the server`)
}

export function toFixes(result) {
    return (result*100)/100
}