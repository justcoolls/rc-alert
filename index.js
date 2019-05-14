'use strict';
import React from 'react';
import './icon/iconfont';
import './style/index.css';

let key = 1;
let rcAlertInstance = 0;
const className = 'myCat-rcAlert';
import rcAlertMessage from './rcAlertMessage';

function outerFrame(callback) {
    if (rcAlertInstance === 0) {
        const div = document.createElement('div');
        div.id = className;
        document.body.appendChild(div);
        rcAlertMessage.newrcAlert(className, function (instance) {
            callback(instance);
            rcAlertInstance = instance;
        })
    } else {
        callback(rcAlertInstance);
    }

}
function node(content) {
    let duration = arguments.length > 1 && !isNaN(arguments[1]) ? arguments[1] : 3;
    let type = arguments[2];
    let onClose = arguments[3];
    let iconType = {
        info: '#icon-info',
        success: '#icon-chenggong1',
        error: '#icon-error',
        warning: '#icon-warning',
    }[type];
    let iconClass = {
        info: 'icon-info',
        success: 'icon-success',
        error: 'icon-error',
        warning: 'icon-warning',
    }[type];
    key++;

    let closePromise = new Promise(function (resolve) {
        let callback = function callback() {
            if (typeof onClose === 'function') {
                onClose();
            }

            return resolve(true);
        };
        outerFrame(function (instance) {
                instance.notice({
                    key: key,
                    duration: duration,
                    style: {},
                    content: React.createElement(
                        'div',
                        {className: 'rcAlert-node-content'},
                        React.createElement(
                            'svg',
                            {className: `icon rcAlert-icon ${iconClass}`},
                            React.createElement(
                                'use', {xlinkHref: iconType}
                            ),
                        ),
                        React.createElement(
                            'span',
                            null,
                            content
                        )
                    ),
                    onClose: callback
                })
            }
        );
    });
    let result = function result() {
        if (rcAlertInstance) {
            rcAlertInstance.removeNotice(target);
        }
    };

    result.then = function (filled, rejected) {
        return closePromise.then(filled, rejected);
    };

    result.promise = closePromise;
    return result;
}

const rcAlertqwe = {
    info: function info(content, duration, onClose) {
        return node(content, duration, 'info', onClose);
    },
    success: function success(content, duration, onClose) {
        return node(content, duration, 'success', onClose);
    },
    error: function error(content, duration, onClose) {
        return node(content, duration, 'error', onClose);
    },
    warn: function warn(content, duration, onClose) {
        return node(content, duration, 'warning', onClose);
    },
    warning: function warning(content, duration, onClose) {
        return node(content, duration, 'warning', onClose);
    },
};
export default rcAlertqwe;