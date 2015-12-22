// LICENSE : MIT
"use strict";
import { Action } from "material-flux";
export var keys = {
    fetchTags: Symbol("fetchTags"),
    postLink: Symbol("postLink"),
    selectTags: Symbol("selectTags"),
    updateTitle: Symbol("updateTitle"),
    updateURL: Symbol("updateURL"),
    updateComment: Symbol("updateComment"),
    enableService: Symbol("enableService"),
    disableService: Symbol("disableService")
};
import HatenaClient from "../../services/hatebu/HatenaClient";
export default class ServiceAction extends Action {
    fetchTags(serviceName) {
        const client = new HatenaClient();
        client.getTags().then(tags => {
            this.dispatch(keys.fetchTags, tags);
        }).catch(error => {
            console.log(error);
        });
    }

    postLink(postData) {
        const client = new HatenaClient();
        client.postLink(postData).catch(error => {
            console.log(error);
        });
    }

    selectTags(tags) {
        this.dispatch(keys.selectTags, tags);
    }

    updateTitle(title) {
        this.dispatch(keys.updateTitle, title);
    }

    updateURL(URL) {
        this.dispatch(keys.updateURL, URL);
    }

    updateComment(comment) {
        this.dispatch(keys.updateComment, comment);
    }

    loginHatebu() {
        var HatenaService = require("remote").require("./src/services/hatebu/HatenaService");
        HatenaService.requireAccess().then(result => {
            console.log(result);
        });
    }

    enableService(service) {
        this.dispatch(keys.enableService, service);
    }

    disableService(service) {
        this.dispatch(keys.disableService, service);
    }
}