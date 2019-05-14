'use strict';
import React from 'react';
import ReactDOM from "react-dom";

function App() {
    this.state={
        nodes : []
    };
    this.setState=function(state, callback){
        this.state.nodes=state.nodes;
        this.render();
        if(callback){
           callback()
        }
    };
    this.add = function (node) {
        const nodes =this.state.nodes;
        node.class = 'move-up-enter';
        nodes.push(node);
        this.setState({
            nodes
        })
    };
    this.onRemove =function (node){
        const self=this;
        setTimeout(function(){
            self.remove(node.key);
        }, node.duration * 1000);
    };
    this.remove =function (key) {
        const self=this;
        const nodeStart = self.state.nodes;
        const len = nodeStart.length;
        let onClose;
        for (let i = 0; i < len; i++) {
            if (nodeStart[i].key === key) {
                nodeStart[i].class = 'move-up-leave';
                onClose = nodeStart[i].onClose;
                break;
            }
        }
        self.setState({
            nodes: nodeStart
        }, function() {
            setTimeout(function() {
                self.onClose(onClose);
                const nodes = self.state.nodes.filter(
                    function (item) {
                        return item.key !== key;
                    });
                self.setState({
                    nodes
                });
            }, 300);
        });
    };
    this.onClose=function (onClose) {
        return onClose();
    };

    this.render=function () {
        const nodes =this.state.nodes;
        ReactDOM.render(
            React.createElement(
                'div',
                null,
                nodes.map((node) => {
                    return React.createElement(
                        'div',
                        {key: node.key, className: `rcAlert-li ${node.class}`},
                        React.createElement(
                            'div',
                            {className: 'rcAlert-node'},
                            node.content,
                        )
                    )
                })
            ), document.getElementById('myCat-rcAlert'));
    }
}

App.newrcAlert = function (className, callback) {
    function ref(app) {
        callback({
            notice(noticeProps) {
                app.add(noticeProps);
                app.onRemove(noticeProps);
            },
        })

    }
    let apps=new App();
    let Apps=apps.render();
    React.createElement('div', {ref: ref(apps)}, Apps,)
};

export default App;